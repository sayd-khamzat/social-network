import React, {useState} from "react"
import styles from "./Paginator.module.css"

// const Paginator = (props) => {
//
//     const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
//     const pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }
//
//     let curP = props.currentPage;
//     let curPF = ((curP - 3) < 0) ? 0 : curP - 3;
//     let curPL = curP + 2;
//     let slicedPages = pages.slice(curPF, curPL);
//
//     return (
//         <div className={styles.paginationBlock}>
//             {slicedPages.map(page =>
//                 <button key={page} className={props.currentPage === page ? styles.selectedPage : null}
//                         onClick={() => props.onPageChanged(page)}>{page}</button>)}
//         </div>
//     );
// }
//
// export default Paginator;

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 5}) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={styles.paginationBlock}>

            {portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1)}}>{"<"}</button>}

            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page =>
                <button key={page} className={currentPage === page ? styles.selectedPage : undefined}
                        onClick={() => onPageChanged(page)}>{page}</button>)}

            {portionNumber < portionCount &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>{">"}</button>}
        </div>
    )
}

export default Paginator