export const mainCategory=[
    {
        "name": "男裝",
        "categoryId": "men",
        level: 1,
        "levelTwoCategory": [
            {
                "name": "上衣",
                "categoryId": "men_tops",
                "level": 2,
                "levelThreeCategory": [
                    {
                        "name": "T恤",
                        "categoryId": "men_tshirts",
                        "parentCategoryId": "men",
                        "level": 2
                    },
                    {
                        "name": "polo衫",
                        "categoryId": "men_polos",
                        "parentCategoryId": "men",
                        "level": 2
                    },
                    {
                        "name": "襯衫",
                        "categoryId": "men_shirts",
                        "parentCategoryId": "men",
                        "level": 2
                    }
                ]
            },
            {
                "name": "褲裝",
                "categoryId": "men_pants",
                level: 2,
                "levelThreeCategory": [
                    {
                        "name": "休閒褲",
                        "categoryId": "men_casual_pants",
                        "parentCategoryId": "men",
                        "level": 2
                    },
                    {
                        "name": "牛仔褲",
                        "categoryId": "men_jeans",
                        "parentCategoryId": "men",
                        "level": 2
                    },
                    {
                        "name": "西裝褲",
                        "categoryId": "men_suit_pants",
                        "parentCategoryId": "men",
                        "level": 2
                    }
                ]
            }
        ]
    },
    {
        "name": "女裝",
        "categoryId": "women",
        "level": 1,
        "levelTwoCategory": [
            {
                "name": "上衣",
                "categoryId": "women_tops",
                "level": 2,
                "levelThreeCategory": [
                    {
                        "name": "襯衫",
                        "categoryId": "women_shirts",
                        "parentCategoryId": "women",
                        "level": 2
                    },
                    {
                        "name": "T恤",
                        "categoryId": "women_tshirts",
                        "parentCategoryId": "women",
                        "level": 2
                    },
                    {
                        "name": "背心",
                        "categoryId": "women_tank_tops",
                        "parentCategoryId": "women",
                        "level": 2
                    }
                ]
            },
            {
                "name": "裙裝",
                "categoryId": "women_dresses",
                "level": 2,
                "levelThreeCategory": [
                    {
                        "name": "連身裙",
                        "categoryId": "women_casual_dresses",
                        "parentCategoryId": "women",
                        "level": 2
                    },
                    {
                        "name": "晚禮服",
                        "categoryId": "women_evening_dresses",
                        "parentCategoryId": "women",
                        "level": 2
                    },
                    {
                        "name": "半身裙",
                        "categoryId": "women_skirts",
                        "parentCategoryId": "women",
                        "level": 2
                    }
                ]
            }
        ]
     },
     {
        "name": "家居與家俱",
        "categoryId": "home_funiture",
        level: 1,
       
     },
     {
        "name": "電子產品",
        "categoryId": "electronics",
        "level": 1,
       
     }

]