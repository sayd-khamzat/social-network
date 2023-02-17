import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/userPhoto.jpg"

const Users = (props) => {

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
        <div>
            {props.users.map(user => (
                <div className={styles.usersBlock} key={user.id}>
                    <div>
                        <img src={user.photos.small
                            ? user.photos.small
                            : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {user.name}
                        <br/>
                        {user.status}
                    </div>
                    <div>
                        {!user.followed
                            ? <button onClick={() => {props.follow(user.id)}}>Follow</button>
                            : <button onClick={() => {props.unFollow(user.id)}}>UnFollow</button>}
                        <div>
                            user.location.country
                            <br/>
                            user.location.city
                        </div>
                    </div>
                </div>
            ))}
            <div className={styles.paginationBlock}>
                {slicedPages.map(page =>
                    <button className={props.currentPage === page && styles.pageNumberActive}
                            onClick={() => props.onPageChanged(page)}>
                        {page}</button>)}
            </div>
        </div>
    );
}

export default Users;