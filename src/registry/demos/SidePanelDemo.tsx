import SidePanel from '../../blocks/layout/SidePanel';

export default function SidePanelDemo() {
  return (
    <div className="flex h-64 w-full overflow-hidden rounded-box border border-base-300">
      <div className="flex flex-1 items-center justify-center bg-base-200 text-sm text-base-content/50">
        Main content
      </div>
      <SidePanel
        title="Scanner"
        footer={<button type="button" className="btn btn-primary btn-sm w-full">Scan</button>}
      >
        <div className="flex flex-col gap-3 text-sm">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Device</legend>
            <select className="select w-full">
              <option>3M AT9000 MK2</option>
              <option>ARH Combo Smart</option>
            </select>
          </fieldset>
          <label className="label cursor-pointer gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
            <span className="label-text">Auto-capture on insert</span>
          </label>
          <p className="text-xs text-base-content/50">
            Controls for the attached document scanner.
          </p>
        </div>
      </SidePanel>
    </div>
  );
}
