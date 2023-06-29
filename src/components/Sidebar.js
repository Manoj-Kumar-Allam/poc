import './Sidebar.css'

const Sidebar = ({ handleLayerChange }) => {
  return (
    <div className="sidebar-overlay">
      <div className="sidebar">
        <label>Select Layer </label>
        <select className="layer-dropdown" onChange={handleLayerChange}>
          <option value="counties">USA Counties</option>
          <option value="states">USA States</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
