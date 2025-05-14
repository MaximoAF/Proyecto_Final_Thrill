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
      <p>Precio: ${articulo.precio.toFixed(2)}</p>
      <p>Categoría: {articulo.categoria}</p>
      <div>
        {articulo.imgs.map((url, index) => (
          <img key={index} src={url} alt={`Imagen ${index + 1}`} width="100" />
        ))}
      </div>
    </div>
  );
};
