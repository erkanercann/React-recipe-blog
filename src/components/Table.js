function Table({ onClick, icons, posts }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th onClick={() => onClick('title')} className="sort-title">
                        Title
                        {icons('title')}
                    </th>
                    <th onClick={() => onClick('category')} className="sort-category">
                        Category
                        {icons('category')}
                    </th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>{posts}</tbody>
        </table>
    );
}
export default Table;
