"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Info } from './Info';
import { Participants } from './Participants';
import { Toolbar } from './Toolbar';
import { nanoid } from 'nanoid';

import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useSelf, useStorage } from '@/liveblocks.config';
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from '@/types/canvas';
import { CursorsPresence } from './CursorsPresence';
import { colorToCss, connectionIdToColor, findIntersectingLayersWithRectangle, penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds } from '@/lib/utils';
import { LiveObject } from '@liveblocks/client';
import { LayerPreview } from './LayerPreview';
import { SelectionBox } from './SelectionBox';
import { SelectionTools } from './SelectionTools';
import { Path } from './_tools/path';
import { useDisableScrollBounce } from '@/hooks/useDisableScrollBounce';
import { UseDeleteLayers } from '@/hooks/UseDeleteLayers';

const MAX_LAYERS = 200;

interface CanvasProps {
  boardId: string;
}

export default function Canvas( { boardId } : CanvasProps ) {

  const layerIds = useStorage((root) => root.layerIds);

  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  const [canvasState, setCanvasState ] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 250, g: 100, b: 150 })

  useDisableScrollBounce();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
    position: Point,
  ) => {
    const liveLayers = storage.get("layers");
    if(liveLayers.size >= MAX_LAYERS){
      return;
    }

    const liveLayerIds = storage.get("layerIds");

    const layerId = nanoid();

    const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);

    setMyPresence({ selection: [layerId] }, { addToHistory: true });
    setCanvasState({ mode: CanvasMode.None });
  }, [lastUsedColor]);

  const translateSelectedLayers = useMutation((
    { storage, self },
    point: Point,
  ) => {
    if (canvasState.mode !== CanvasMode.Translating){
      return;
    }

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }

    const liveLayers = storage.get('layers');

    for (const id of self.presence.selection){
      const layer = liveLayers.get(id);

      if (layer) {
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y
        });
      }
    }

    setCanvasState({ mode: CanvasMode.Translating, current: point });
  }, [ canvasState ]);

  const unselectLayers = useMutation(({self, setMyPresence}) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const selectAllLayers = useMutation(({ storage, setMyPresence }) => {
    const layerIds = storage.get("layerIds").toArray();
    setMyPresence({ selection: layerIds })
  }, [layerIds])

  const updateSelectionNet = useMutation(({ storage, setMyPresence }, current: Point, origin: Point) => {
    const layers = storage.get("layers").toImmutable();
    setCanvasState({
      mode: CanvasMode.SelectionNet,
      origin: origin,
      current: current
    });

    const ids = findIntersectingLayersWithRectangle(layerIds, layers, origin, current);

    setMyPresence({ selection: ids })
  }, [layerIds]);

  const startMutliSelection = useCallback((current: Point, origin: Point) => {
    if(Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current
      })
    }
  }, [])

  const resizeSelectedLayer = useMutation((
    { storage, self},
    point: Point
  ) => {
    if(canvasState.mode !== CanvasMode.Resizing){
      return;
    }

    const bounds = resizeBounds(
      canvasState.initialBounds,
      canvasState.corner,
      point,
    );

    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if(layer){
      layer.update(bounds);
    };

  }, [canvasState])

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, event: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        event.buttons !== 1 ||
        !pencilDraft
      )
        return;

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, event.pressure]],
      });
    },
    [canvasState.mode]
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (
        !pencilDraft ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({
        mode: CanvasMode.Pencil,
      });
    },
    [lastUsedColor]
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        pencilColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  const onResizeHandlePointerDown = useCallback((corner: Side, initialBounds: XYWH) => {
    history.pause();
    setCanvasState({ mode:CanvasMode.Resizing, initialBounds, corner });
  }, [history])

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }));
  }, []);

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();

    const current = pointerEventToCanvasPoint(e, camera);

    if (canvasState.mode === CanvasMode.Pressing) {
      startMutliSelection(current, canvasState.origin);
    } else if(canvasState.mode === CanvasMode.SelectionNet) {
      updateSelectionNet(current, canvasState.origin);
    } else if (canvasState.mode === CanvasMode.Translating){
      translateSelectedLayers(current);
    } else if(canvasState.mode === CanvasMode.Resizing) {
      resizeSelectedLayer(current);
    } else if(canvasState.mode === CanvasMode.Pencil) {
      continueDrawing(current, e);
    }

    setMyPresence({ cursor: current });
  }, [canvasState, resizeSelectedLayer, camera, startDrawing, translateSelectedLayers, startMutliSelection, updateSelectionNet])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e, camera);

    if(canvasState.mode === CanvasMode.Inserting){
      return;
    }

    if (canvasState.mode === CanvasMode.Pencil) {
      startDrawing(point, e.pressure);
      return;
    }
    
    setCanvasState({ origin: point, mode: CanvasMode.Pressing });
  }, [camera, canvasState, setCanvasState, startDrawing])

  const onPointerUp = useMutation((
    {},
    e ) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None
        })
      }

      history.resume();
    }, [ camera, canvasState, history, insertLayer, unselectLayers, insertPath, setCanvasState ]);

    const onLayerPointerDown = useMutation((
      { self, setMyPresence },
      e: React.PointerEvent,
      layerId: string,
    ) => {
      if(
        canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if(!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      };
      
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    }, [setCanvasState, camera, history, canvasState.mode])

    const selections = useOthersMapped((other) => other.presence.selection);

    const layerIdsToColorSelection = useMemo(() => {
      const layerIdsToColorSelection: Record<string, string> = {};

      for (const user of selections) {
        const [connectionId, selection] = user;

        for (const layerId of selection) {
          layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
        }
      }

      return layerIdsToColorSelection;
    }, [selections]);

  
  const deleteLayers = UseDeleteLayers();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "a": {
          if (e.ctrlKey || e.metaKey){
            e.preventDefault();
            selectAllLayers();
            break;
          }
          break;
        } 
        case "t": {
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text });
          break;
        }
        case "v": {
          setCanvasState({ mode: CanvasMode.None });
          break;
        }
        case "y": {
          if (e.ctrlKey || e.metaKey) {
            history.redo();
            break;
          }
          break;
        }
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            history.undo();
            break;
          }
          break;
        }
        case "Delete": {
          deleteLayers();
          break;
        }
        default: {
          break;
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ deleteLayers ,history ]);

  return (
    <main className='h-full w-full relative touch-none z-10'>
        <Info boardId={boardId}/>
        <Participants />
        <Toolbar 
          canvasState={canvasState} 
          setCanvasState={setCanvasState} 
          canRedo={canRedo} canUndo={canUndo} 
          undo={history.undo} 
          redo={history.redo}
        />
        <SelectionTools 
          camera={camera}
          setLastUsedColor={setLastUsedColor}
        />
        <svg 
          className='h-[100vh] w-[100vw]'
          onWheel={onWheel}
          onPointerMove={onPointerMove}  
          onPointerLeave={onPointerLeave}
          onPointerUp={onPointerUp}
          onPointerDown={onPointerDown}
        >
          <g
            style={{
              transform: `translate(${camera.x}px, ${camera.y}px)`
            }}
          >
            {layerIds.map((layerId) => (
              <LayerPreview
                key={layerId}
                id={layerId}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={layerIdsToColorSelection[layerId]}
              />
            ))}
            <SelectionBox 
              onResizeHandlePointerDown={onResizeHandlePointerDown}
            />
            {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
              <rect 
                className='fill-blue-500/30 stroke-blue-500 stroke-1' 
                x={Math.min(canvasState.origin.x, canvasState.current.x)} 
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
            <CursorsPresence />
            {pencilDraft != null && pencilDraft.length > 0 && (
              <Path points={pencilDraft} fill={colorToCss(lastUsedColor)} x={0} y={0}/>
            )}
          </g>
        </svg>
    </main>
  )
}
