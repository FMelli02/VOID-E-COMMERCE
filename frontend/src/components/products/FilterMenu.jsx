import React from 'react';

// Recibimos los filtros actuales y la función para cambiarlos como props
const FilterMenu = ({ filters, setFilters }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
        material: '',
        precio_max: '',
        talle: '',
        color: '',
        sort_by: ''
    });
  };

  return (
    <div className="filter-menu">
      <h4>Filtros</h4>
      <div className="filter-group">
        <label htmlFor="material">Material</label>
        <input type="text" id="material" name="material" value={filters.material} onChange={handleInputChange} placeholder="Ej: Algodón" />
      </div>
      <div className="filter-group">
        <label htmlFor="precio_max">Precio Máximo</label>
        <input type="number" id="precio_max" name="precio_max" value={filters.precio_max} onChange={handleInputChange} placeholder="Ej: 5000" />
      </div>
      <div className="filter-group">
        <label htmlFor="talle">Talle</label>
        <input type="text" id="talle" name="talle" value={filters.talle} onChange={handleInputChange} placeholder="Ej: M" />
      </div>
       <div className="filter-group">
        <label htmlFor="color">Color</label>
        <input type="text" id="color" name="color" value={filters.color} onChange={handleInputChange} placeholder="Ej: Negro" />
      </div>
      <div className="filter-group">
        <label htmlFor="sort_by">Ordenar por</label>
        <select id="sort_by" name="sort_by" value={filters.sort_by} onChange={handleInputChange}>
          <option value="">Relevancia</option>
          <option value="precio_asc">Precio: Menor a Mayor</option>
          <option value="precio_desc">Precio: Mayor a Menor</option>
          <option value="nombre_asc">Nombre: A-Z</option>
          <option value="nombre_desc">Nombre: Z-A</option>
        </select>
      </div>
      <button onClick={handleResetFilters} className="reset-filters-btn">Limpiar Filtros</button>
    </div>
  );
};

export default FilterMenu;