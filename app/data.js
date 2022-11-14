export const categories = [
    {id: "furniture", name: "Furniture"},
    {id: "clothes", name: "Clothes"},
    {id: "others", name: "Other"}
]

export const profile = {
    user: "0x0",
    badges: ["FURNITURE_LV_1"],
    reviews: [
        {from: "0x0", deal: "0x1", score: 100, comment: "Lorem Ipsum..."},
        {from: "0x0", deal: "0x2", score: 100, comment: "Lorem Ipsum..."},
        {from: "0x0", deal: "0x3", score: 100, comment: "Lorem Ipsum..."}
    ]
}

export const badges = [
    {id: "FURNITURE_LV_1", name: "Furniture 1", img: "https://www"},
    {id: "FURNITURE_LV_2", name: "Furniture 2", img: "https://www"},
    {id: "FURNITURE_LV_3", name: "Furniture 3", img: "https://www"},
    {id: "CLOTHES_LV_1", name: "Clothes 1", img: "https://www"},
    {id: "CLOTHES_LV_2", name: "Clothes 2", img: "https://www"},
    {id: "CLOTHES_LV_3", name: "Clothes 3", img: "https://www"}
]

export const deals = [
    { address: "0x0ABCDEF", seller: "0x11111111", buyer: "0x22222222", articleId: 1, amount: 2000, shippingAddr: "Lorem ipsum", status: 1 },
    { address: "0x0ABCDEG", seller: "0x11111111", buyer: "0x22222222", articleId: 3, amount: 1500, shippingAddr: "Lorem ipsum", status: 1 },
    { address: "0x0ABCDEH", seller: "0x11111111", buyer: "0x22222222", articleId: 6, amount: 2400, shippingAddr: "Lorem ipsum", status: 1 },
    { address: "0x0ABCDEI", seller: "0x11111111", buyer: "0x22222222", articleId: 9, amount: 3000, shippingAddr: "Lorem ipsum", status: 0 },
]

const images = [
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229742/store/red-sofa_zzovci.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229742/store/blue-sofa_f0uxmq.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229746/store/wood-chair_xmvsdf.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229743/store/steel-chair_u0anrb.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229747/store/party-shirts_ipcvmg.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229743/store/leather-jacket_as6gnn.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229743/store/blue-jeans_gimvnz.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229742/store/jordans_mkt3dj.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229747/store/tv-hyundai_hm3ktp.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229748/store/toaster_zoj6g3.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229742/store/fridge_yupvbk.jpg",
    "https://res.cloudinary.com/ddh8uexpl/image/upload/v1668229748/store/wash-machine_w7yuk2.jpg",
]

function newArticle(id, image, title, category, price, _description, active, age, materials, country, extra) {
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const seller = "TQDUiXESXKpn17N9ajjRW3vnvbzDvvWq5S";
    return {
        id, seller, image, title, category, price, description, active, details:{age, materials, country, extra}
    }
}

// weight and dimentions
export const articles = [
    newArticle(0, images[0], "Red Sofa", "furniture", 1800, "Lorem desc", true, 2, ["wood"], "Colombia", "" ),
    newArticle(1, images[1], "Blue Sofa", "furniture", 1700, "Lorem desc", true, 3, ["wood"], "Colombia", "" ),
    newArticle(2, images[2], "Wood chair", "furniture", 600, "Lorem desc", true, 4, ["wood"], "Colombia", "" ),
    newArticle(3, images[3], "Steel chair", "furniture", 800, "Lorem desc", true, 2, ["steel"], "Colombia", "" ),
    newArticle(4, images[4], "3 Party Shirts", "clothes", 150, "Lorem desc", true, 1, ["cotton"], "Colombia", "" ),
    newArticle(5, images[5], "Leather Jacket", "clothes", 200, "Lorem desc", true, 1, ["leather"], "Colombia", "" ),
    newArticle(6, images[6], "2 Jeans", "clothes", 100, "Lorem desc", true, 1, ["jean"], "Colombia", "" ),
    newArticle(7, images[7], "Jordan Shoes", "clothes", 400, "Lorem desc", true, 2, ["leather"], "Colombia", "" ),
    newArticle(8, images[8], "Flat screen TV 32inch", "others", 500, "Lorem desc", true, 2, ["plastic"], "Colombia", "" ),
    newArticle(9, images[9], "Toaster 2 slice", "others", 300, "Lorem desc", true, 4, ["steel"], "Colombia", "" ),
    newArticle(10, images[10], "Whirpool Fridge", "others", 1400, "Lorem desc", true, 3, ["steel"], "Colombia", "" ),
    newArticle(11, images[11], "LG Washing Machine", "others", 900, "Lorem desc", true, 3, ["steel"], "Colombia", "" ),
]