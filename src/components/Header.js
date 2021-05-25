import PropTypes from 'prop-types';
import Button from './Button';

export const Header = ({title, onAdd, showAdd }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button
                color={showAdd ? 'red' : 'green'}
                text={showAdd ? 'Cerrar' : 'Agregar Tarea'}
                onClick={ onAdd } />
        </header>
    )
}

// Si no se manda un parametro cuando se define el componente se utiliza este
Header.defaultProps = {
    title: 'Task Tracker',
}

// Especificamos el tipo de dato
Header.propTypes = {
    title: PropTypes.string.isRequired,
}