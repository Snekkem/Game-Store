import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/',
    headers: {
        "content-type": "multipart/form-data"
    }
})

export const gamesAPI = {
    getGames() {
        return axios.get('http://localhost:8000/games').then(response => {
            return response.data;
        })
    },
    getGameByID(gameID) {
        return axios.get(`http://localhost:8000/games/${gameID}`).then(response => {
            return response.data;
        })
    },
    getPicByGameID(gameID) {
        return axios.get(`http://localhost:8000/games/${gameID}/pictures`).then(response => {
            return response.data;
        })
    },
    getGenreByGameID(gameID) {
        return axios.get(`http://localhost:8000/games/${gameID}/genres`).then(response => {
            return response.data;
        })
    },
    getReviewsByGameID(gameID) {
        return axios.get(`http://localhost:8000/games/${gameID}/reviews`).then(response => {
            return response.data;
        })
    },
    getGamesByGenre(gameName) {
        return axios.get(`http://localhost:8000/games/search-by-genre/${gameName}`).then(response => {
            return response.data;
        })
    },
    sendReview(token, gameID, review, isLike) {
        return axios.post(`http://localhost:8000/games/reviews`, {token, gameID, review, isLike}).then(response => {
            return response.data;
        })
    },
    deleteReview(token, gameID, reviewID) {
        return axios.post(`http://localhost:8000/games/delete`, {token, gameID, reviewID}).then(response => {
            return response.data;
        })
    }
}

export const userAPI = {
    getUsers() {
        return axios.get(`http://localhost:8000/users`).then(response => {
            return response.data;
        })
    },
    getUserByID(userID) {
        return axios.post(`http://localhost:8000/users/${userID}`, {token: null}).then(response => {
            return response.data;
        })
    },
    getMyProfile(token) {
        return axios.post(`http://localhost:8000/users`, {token}).then(response => {
            return response.data;
        })
    },
    getGamesProfile(token) {
        return axios.post(`http://localhost:8000/users/games`, {token}).then(response => {
            return response.data;
        })
    },
    getGamesByUserID(userID) {
        return axios.post(`http://localhost:8000/users/games/${userID}`,{token: null}).then(response => {
            return response.data;
        })
    },
    getUserCart(token) {
        return axios.post(`http://localhost:8000/users/cart`, {token}).then(response => {
            return response.data;
        })
    },
    getUserWishlist(token) {
        return axios.post(`http://localhost:8000/users/wishlist`, {token}).then(response => {
            return response.data;
        })
    },
    isBought(token, gameID) {
        return axios.post(`http://localhost:8000/users/isExist`, {token, gameID}).then(response => {
            return response.data;
        })
    },
    updateUserAbout(token, aboutUser) {
        return axios.post(`http://localhost:8000/users/aboutUser`, {token, aboutUser}).then(response => {
            return response.data;
        })
    },
    getBalance(token) {
        return axios.post(`http://localhost:8000/users/balance`, {token}).then(response => {
            return response.data;
        })
    }
}

export const cartAPI = {
    addGameInCart(token, gameID) {
        return axios.post(`http://localhost:8000/cart/add`, {token, gameID}).then(response => {
            return response.data;
        })
    },
    deleteGameFromCart(gameID, token) {
        return axios.post(`http://localhost:8000/cart/delete`, {gameID, token}).then(response => {
            return response.data;
        })
    },
    buyGames(token) {
        return axios.post(`http://localhost:8000/cart/buy`, {token}).then(response => {
            return response.data;
        })
    },
    isExistInCart(token, gameID) {
        return axios.post(`http://localhost:8000/cart/isExist`, {token, gameID}).then(response => {
            return response.data;
        })
    }
}

export const wishlistAPI = {
    addGameInWishlist(token, gameID) {
        return axios.post(`http://localhost:8000/wishlist/add`, {token, gameID}).then(response => {
            return response.data;
        })
    },
    isExistInWishlist(token, gameID) {
        return axios.post(`http://localhost:8000/wishlist/isExist`, {token, gameID}).then(response => {
            return response.data;
        })
    },
    deleteGameFromWishlist(gameID, token) {
        return axios.post(`http://localhost:8000/wishlist/delete`, {gameID, token}).then(response => {
            return response.data;
        })
    }
}

export const authAPI = {
    Auth(email, password) {
        return axios.post('http://localhost:8000/users/auth', {email, password});
    },
    Register(userName, email, balance, location, aboutUser, userImage, password) {
        return axios.post('http://localhost:8000/users/register', {
            userName, email, balance, location, aboutUser, userImage, password
        });
    }

}