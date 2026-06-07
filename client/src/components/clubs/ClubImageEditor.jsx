import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

export default function ClubImageEditor({ clubId, onSave, onClose }) {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600, height: 400,
      backgroundColor: '#171f33',
      preserveObjectStacking: true,
    });
    fabricRef.current = canvas;
    return () => canvas.dispose();
  }, []);

  const addText = () => {
    if (!textInput || !fabricRef.current) return;
    const text = new fabric.Text(textInput, {
      left: 100, top: 100, fontSize: 24,
      fontFamily: 'JetBrains Mono, monospace',
      fill: '#00f0ff',
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
        img.set({ left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 });
        fabricRef.current.add(img);
        fabricRef.current.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const addSticker = (emoji) => {
    if (!fabricRef.current) return;
    const text = new fabric.Text(emoji, { left: 150, top: 150, fontSize: 48 });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
  };

  const applyFilter = (name) => {
    if (!fabricRef.current) return;
    const active = fabricRef.current.getActiveObject();
    if (!active || active.type !== 'image') return;
    const filters = { grayscale: new fabric.Image.filters.Grayscale(), sepia: new fabric.Image.filters.Sepia(), invert: new fabric.Image.filters.Invert(), brightness: new fabric.Image.filters.Brightness({ brightness: 0.2 }), contrast: new fabric.Image.filters.Contrast({ contrast: 0.3 }) };
    const filter = filters[name];
    if (filter) { active.filters = [filter]; active.applyFilters(); fabricRef.current.renderAll(); }
  };

  const deleteSelected = () => { if (fabricRef.current) { const a = fabricRef.current.getActiveObject(); if (a) fabricRef.current.remove(a); } };
  const saveCanvas = () => { if (fabricRef.current) onSave([fabricRef.current.toDataURL({ format: 'png', quality: 1 })]); };
  const clearCanvas = () => { if (fabricRef.current) { fabricRef.current.clear(); fabricRef.current.backgroundColor = '#171f33'; fabricRef.current.renderAll(); } };

  return (
    <div className="glass-card rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono font-semibold text-primary-container">&gt; Leapx Workspace</h3>
        <div className="flex gap-2">
          <button onClick={clearCanvas} className="text-xs text-on-surface-variant hover:text-error border border-white/10 px-2 py-1 rounded-lg font-mono">Clear</button>
          <button onClick={saveCanvas} className="text-xs text-on-primary bg-primary-container px-3 py-1 rounded-lg hover:brightness-110 font-mono">Save to Gallery</button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-44 space-y-3 flex-shrink-0">
          <div className="text-label-sm text-on-surface-variant">Tools</div>
          <div className="flex flex-wrap gap-1">
            {['select', 'text', 'image', 'delete'].map(t => (
              <button key={t} onClick={() => { if (t === 'select') fabricRef.current?.setSelectionMode(true); }}
                className="text-xs font-mono px-2 py-1 rounded-lg border border-white/10 text-on-surface-variant hover:border-primary-container/50 hover:text-primary-container">{t}</button>
            ))}
          </div>

          <div className="text-label-sm text-on-surface-variant">Text</div>
          <div className="flex gap-1">
            <input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="type..." className="input-glass flex-1 text-xs" onKeyDown={e => e.key === 'Enter' && addText()} />
            <button onClick={addText} className="text-xs text-primary-container border border-primary-container/30 px-2 rounded-lg hover:bg-primary-container/10 font-mono">+</button>
          </div>

          <div className="text-label-sm text-on-surface-variant">Stickers</div>
          <div className="flex flex-wrap gap-1">
            {['⭐', '🔥', '💎', '🚀', '💻', '🏆', '🎯', '✨', '❤️', '👑'].map(e => (
              <button key={e} onClick={() => addSticker(e)} className="text-lg hover:scale-125 transition-transform">{e}</button>
            ))}
          </div>

          <div className="text-label-sm text-on-surface-variant">Filters</div>
          <div className="flex flex-wrap gap-1">
            {['grayscale', 'sepia', 'invert', 'brightness', 'contrast'].map(f => (
              <button key={f} onClick={() => applyFilter(f)} className="text-xs text-on-surface-variant border border-white/10 px-2 py-1 rounded-lg hover:text-on-surface font-mono">{f}</button>
            ))}
          </div>

          <label className="text-xs text-primary-container border border-primary-container/30 px-2 py-1 rounded-lg cursor-pointer hover:bg-primary-container/10 inline-block font-mono">
            + Image
            <input type="file" accept="image/*" onChange={addImage} className="hidden" />
          </label>

          <button onClick={deleteSelected} className="text-xs text-error border border-error/30 px-2 py-1 rounded-lg hover:bg-error/10 font-mono block">Delete</button>
        </div>

        <div className="flex-1 border border-white/10 rounded-xl overflow-hidden bg-surface-dimmer" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,240,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
