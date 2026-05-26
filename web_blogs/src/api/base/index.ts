import request from "../../utlis/request.ts";

export function fetchFile() {
    return request({
        url: `${module}/getRtsp`,
        method: 'get',
        params,
    });
}
