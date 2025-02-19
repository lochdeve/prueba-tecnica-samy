import { render, screen } from '@testing-library/react';
import Navbar from '.';

describe('Navbar Component', () => {
  test('renderiza correctamente el logo y el campo de búsqueda', () => {
    render(<Navbar />);

    // Verificar que el logo está presente
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    // Verificar el placeholder del input
    const input = screen.getByPlaceholderText("You're looking for something?");
    expect(input).toBeInTheDocument();
  });
});
