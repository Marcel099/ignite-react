export interface AddProductToFavListProps {
  onAddToFavList: () => void
  onRequestClose: () => void
}

export function AddProductToFavList({
  onAddToFavList,
  onRequestClose
}: AddProductToFavListProps) {
  return (
    <span>
      Deseja adicionar aos favoritos?
      {/* <button type="button" onClick={onAddToFavList}>Sim</button>
      <button type="button" onClick={onRequestClose}>Não</button> */}
    </span>
  )
}
