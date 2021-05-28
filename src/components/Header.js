import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom'

export const Header = ({title, onAdd, showAdd }) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button
                color={showAdd ? 'red' : 'green'}
                text={showAdd ? 'Cerrar' : 'Agregar Tarea'}
                onClick={ onAdd } 
            />}
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