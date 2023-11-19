import {http} from '@/utils/http'

export const postMemberCart = (data:{}) => {
    return http({
        method:'POST',
        url:'/member/cart',
        data
    })
}

export const getMemberCart = () => {
    return http({
        method:'GET',
        url:'/member/cart'
    })
}

export const deleteMemberCart = (data:any) => {
    return http({
        method:'DELETE',
        url:'/member/cart',
        data
    })
}


export const putMemberCartAmend = (skuId:string,data:any) => {
    return http({
        method:'PUT',
        url:`/member/cart/${skuId}`,
        data
    })
}