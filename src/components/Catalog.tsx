import { useSelector } from "react-redux"

export const Catalog: React.FC = () => {

    const catalog = useSelector(state => state)
    console.log(catalog)

    return (
        <h1>Catalog</h1>
    )
}