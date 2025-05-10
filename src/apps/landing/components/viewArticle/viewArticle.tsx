type Props = {
  articulo: {
    titulo: string;
    precio: number;
    categoria: string;
    imgs: string[];
  };
};

export const ViewArticle: React.FC<Props> = ({ articulo }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', maxWidth: '600px' }}>
      <h1>{articulo.titulo}</h1>
      <p><strong>Precio:</strong> ${articulo.precio.toFixed(2)}</p>
      <p><strong>Categoría:</strong> {articulo.categoria}</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
        {articulo.imgs.map((url, index) => (
          <img key={index} src={url} alt={`Imagen ${index + 1}`} width="100" />
        ))}
      </div>
    </div>
  );
};
