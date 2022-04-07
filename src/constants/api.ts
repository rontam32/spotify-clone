import { Method } from "axios";

export const HTTP_METHODS:  {[key: string]: Method} = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}