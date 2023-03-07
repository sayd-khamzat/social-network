import React from "react";
import styles from "./Paginator.module.css"

const Paginator = (props) => {

    const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let curP = props.currentPage;
    let curPF = ((curP - 3) < 0) ? 0 : curP - 3;
    let curPL = curP + 2;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div className={styles.paginationBlock}>
            {slicedPages.map(page =>
                <button key={page} className={props.currentPage === page ? styles.selectedPage : null}
                        onClick={() => props.onPageChanged(page)}>{page}</button>)}
        </div>
    );
}

export default Paginator;