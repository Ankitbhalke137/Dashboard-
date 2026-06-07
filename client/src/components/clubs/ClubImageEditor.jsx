import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

export default function ClubImageEditor({ clubId, onSave, onClose }) {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [activeTool, setActiveTool] = useState('select');
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: '#1a1a2e',
      preserveObjectStacking: true,
    });
    fabricRef.current = canvas;

    return () => canvas.dispose();
  }, []);

  const addText = () => {
    if (!textInput || !fabricRef.current) return;
    const text = new fabric.Text(textInput, {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: 'Fira Code, monospace',
      fill: '#00ff41',
      shadow: '0 0 5px #00ff41',
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    setTextInput('');
  };

  const addImage = (e) => {
    const file = e.target.files?.[0];
    if (!file || !fabricRef.current) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.set({
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        fabricRef.current.add(img);
        fabricRef.current.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const addSticker = (emoji) => {
    if (!fabricRef.current) return;
    const text = new fabric.Text(emoji, {
      left: 150,
      top: 150,
      fontSize: 48,
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
  };

  const applyFilter = (filterName) => {
    if (!fabricRef.current) return;
    const active = fabricRef.current.getActiveObject();
    if (!active || active.type !== 'image') return;

    let filter;
    switch (filterName) {
      case 'grayscale': filter = new fabric.Image.filters.Grayscale(); break;
      case 'sepia': filter = new fabric.Image.filters.Sepia(); break;
      case 'invert': filter = new fabric.Image.filters.Invert(); break;
      case 'brightness': filter = new fabric.Image.filters.Brightness({ brightness: 0.2 }); break;
      case 'contrast': filter = new fabric.Image.filters.Contrast({ contrast: 0.3 }); break;
      default: return;
    }
    active.filters = [filter];
    active.applyFilters();
    fabricRef.current.renderAll();
  };

  const deleteSelected = () => {
    if (!fabricRef.current) return;
    const active = fabricRef.current.getActiveObject();
    if (active) fabricRef.current.remove(active);
  };

  const saveCanvas = () => {
    if (!fabricRef.current) return;
    const dataURL = fabricRef.current.toDataURL({ format: 'png', quality: 1 });
    onSave([dataURL]);
  };

  const clearCanvas = () => {
    if (!fabricRef.current) return;
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = '#1a1a2e';
    fabricRef.current.renderAll();
  };

  return (
    <div className="glass-card rounded p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono neon-text">&gt; Image Editor</h3>
        <div className="flex gap-2">
          <button
            onClick={clearCanvas}
            className="text-xs text-gray-500 hover:text-red-400 border border-gray-700 px-2 py-1 rounded font-mono"
          >
            clear
          </button>
          <button
            onClick={saveCanvas}
            className="text-xs text-neon-green border border-neon-green px-3 py-1 rounded hover:bg-neon-green/10 font-mono"
          >
            save to gallery
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="space-y-2 w-40 flex-shrink-0">
          <div className="text-xs text-gray-500 font-mono mb-2">Tools</div>

          <div className="flex flex-wrap gap-1">
            {['select', 'text', 'image', 'delete'].map(tool => (
              <button
                key={tool}
                onClick={() => {
                  setActiveTool(tool);
                  if (tool === 'select') fabricRef.current?.setSelectionMode(true);
                }}
                className={`text-xs px-2 py-1 rounded font-mono ${
                  activeTool === tool ? 'bg-neon-green/20 text-neon-green border border-neon-green' : 'text-gray-400 border border-gray-700'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-500 font-mono mb-1 mt-3">Text</div>
          <div className="flex gap-1">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="type here..."
              className="flex-1 bg-dark-700 border border-gray-700 rounded px-2 py-1 text-xs text-white font-mono focus:border-neon-green focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && addText()}
            />
            <button onClick={addText} className="text-xs text-neon-green border border-neon-green px-2 rounded hover:bg-neon-green/10 font-mono">+</button>
          </div>

          <div className="text-xs text-gray-500 font-mono mb-1 mt-3">Stickers</div>
          <div className="flex flex-wrap gap-1">
            {['⭐', '🔥', '💎', '🚀', '💻', '🏆', '🎯', '✨', '❤️', '👑'].map(emoji => (
              <button
                key={emoji}
                onClick={() => addSticker(emoji)}
                className="text-lg hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-500 font-mono mb-1 mt-3">Filters</div>
          <div className="flex flex-wrap gap-1">
            {['grayscale', 'sepia', 'invert', 'brightness', 'contrast'].map(f => (
              <button
                key={f}
                onClick={() => applyFilter(f)}
                className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded hover:text-white font-mono"
              >
                {f}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-500 font-mono mb-1 mt-3">Upload</div>
          <label className="text-xs text-neon-cyan border border-neon-cyan/30 px-2 py-1 rounded cursor-pointer hover:bg-neon-cyan/10 inline-block font-mono">
            + Image
            <input type="file" accept="image/*" onChange={addImage} className="hidden" />
          </label>

          <button onClick={deleteSelected} className="text-xs text-red-400 border border-red-400/30 px-2 py-1 rounded hover:bg-red-400/10 block mt-2 font-mono">
            delete selected
          </button>
        </div>

        <div className="flex-1 border border-gray-700 rounded overflow-hidden">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
