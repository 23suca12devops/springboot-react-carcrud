import PropTypes from "prop-types";

function CarList({ cars, onDelete }) {
  return (
    <ul>
      {cars.map(car => (
        <li key={car.id} style={styles.li}>
          <strong>{car.brand}</strong> {car.model} ({car.year}, {car.engine})
          - ${car.price} (Resale: ${car.resalePrice})
          <button onClick={() => onDelete(car.id)} style={styles.button}>X</button>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  li: { marginBottom: "0.5rem" },
  button: { marginLeft: "0.5rem", cursor: "pointer" }
};

CarList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CarList;