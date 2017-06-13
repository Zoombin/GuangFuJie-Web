import axios from 'axios';
export function getBannerList(offset, limit, sort, order) {
    return axios({
        url: '/api/banner/list',
        method: 'get',
        params: {
            offset,
            limit,
            sort,
            order
        }
    });
}