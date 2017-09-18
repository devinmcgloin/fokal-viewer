import React, {Component} from 'react'
import {ImageCardSmall} from "../components/cards/image";
import {GridCollection} from "../components/collection";
import {Link} from 'react-router-dom'

const sierras = {
    "images": [
        {
            "id": "LVXlAOlmkTKR",
            "permalink": "https://api.fok.al/v0/images/LVXlAOlmkTKR",
            "publish_time": "2017-09-08T22:57:31.800226Z",
            "last_modified": "2017-09-08T22:57:31.800226Z",
            "landmarks": [],
            "colors": [
                {
                    "sRGB": {
                        "r": 103,
                        "g": 110,
                        "b": 58
                    },
                    "hex": "676E3A",
                    "hsv": {
                        "h": 68,
                        "s": 47,
                        "v": 43
                    },
                    "shade": "Grey",
                    "color_name": "Costa Del Sol",
                    "pixel_fraction": 0.013575109,
                    "score": 0.18298304
                },
                {
                    "sRGB": {
                        "r": 86,
                        "g": 88,
                        "b": 79
                    },
                    "hex": "56584F",
                    "hsv": {
                        "h": 73,
                        "s": 10,
                        "v": 34
                    },
                    "shade": "Grey",
                    "color_name": "Fuscous Gray",
                    "pixel_fraction": 0.19262782,
                    "score": 0.108436346
                },
                {
                    "sRGB": {
                        "r": 199,
                        "g": 194,
                        "b": 186
                    },
                    "hex": "C7C2BA",
                    "hsv": {
                        "h": 36,
                        "s": 6,
                        "v": 78
                    },
                    "shade": "White",
                    "color_name": "Cotton Seed",
                    "pixel_fraction": 0.1621086,
                    "score": 0.088675156
                },
                {
                    "sRGB": {
                        "r": 89,
                        "g": 98,
                        "b": 46
                    },
                    "hex": "59622E",
                    "hsv": {
                        "h": 70,
                        "s": 53,
                        "v": 38
                    },
                    "shade": "Grey",
                    "color_name": "Woodland",
                    "pixel_fraction": 0.031609196,
                    "score": 0.15638207
                },
                {
                    "sRGB": {
                        "r": 82,
                        "g": 92,
                        "b": 49
                    },
                    "hex": "525C31",
                    "hsv": {
                        "h": 73,
                        "s": 46,
                        "v": 36
                    },
                    "shade": "Grey",
                    "color_name": "Woodland",
                    "pixel_fraction": 0.011791518,
                    "score": 0.107565224
                },
                {
                    "sRGB": {
                        "r": 116,
                        "g": 115,
                        "b": 105
                    },
                    "hex": "747369",
                    "hsv": {
                        "h": 54,
                        "s": 9,
                        "v": 45
                    },
                    "shade": "Grey",
                    "color_name": "Flint",
                    "pixel_fraction": 0.08977408,
                    "score": 0.07946398
                },
                {
                    "sRGB": {
                        "r": 122,
                        "g": 121,
                        "b": 92
                    },
                    "hex": "7A795C",
                    "hsv": {
                        "h": 57,
                        "s": 24,
                        "v": 47
                    },
                    "shade": "Grey",
                    "color_name": "Flax Smoke",
                    "pixel_fraction": 0.02705113,
                    "score": 0.05329309
                },
                {
                    "sRGB": {
                        "r": 164,
                        "g": 159,
                        "b": 151
                    },
                    "hex": "A49F97",
                    "hsv": {
                        "h": 36,
                        "s": 7,
                        "v": 64
                    },
                    "shade": "Grey",
                    "color_name": "Dawn",
                    "pixel_fraction": 0.14070551,
                    "score": 0.042474333
                },
                {
                    "sRGB": {
                        "r": 111,
                        "g": 119,
                        "b": 76
                    },
                    "hex": "6F774C",
                    "hsv": {
                        "h": 71,
                        "s": 36,
                        "v": 46
                    },
                    "shade": "Grey",
                    "color_name": "Go Ben",
                    "pixel_fraction": 0.00307174,
                    "score": 0.031641234
                },
                {
                    "sRGB": {
                        "r": 89,
                        "g": 90,
                        "b": 69
                    },
                    "hex": "595A45",
                    "hsv": {
                        "h": 62,
                        "s": 23,
                        "v": 35
                    },
                    "shade": "Grey",
                    "color_name": "Finch",
                    "pixel_fraction": 0.020610385,
                    "score": 0.030743629
                }
            ],
            "tags": [
                "lake",
                "sierras",
                "california",
                "grass"
            ],
            "labels": [
                {
                    "description": "waterway",
                    "score": 0.91011
                },
                {
                    "description": "water",
                    "score": 0.8421425
                },
                {
                    "description": "water resources",
                    "score": 0.90767175
                },
                {
                    "description": "lake",
                    "score": 0.89586926
                },
                {
                    "description": "nature reserve",
                    "score": 0.9179224
                },
                {
                    "description": "wetland",
                    "score": 0.8099532
                },
                {
                    "description": "bank",
                    "score": 0.8332987
                },
                {
                    "description": "river",
                    "score": 0.8323779
                },
                {
                    "description": "reservoir",
                    "score": 0.80503726
                },
                {
                    "description": "inlet",
                    "score": 0.6523049
                }
            ],
            "user": {
                "id": "devinmcgloin",
                "permalink": "https://api.fok.al/v0/users/devinmcgloin",
                "email": "devinmcgloin@gmail.com",
                "name": "Devin McGloin",
                "bio": "Working on Fokal",
                "url": "https://devinmcgloin.com",
                "location": "New York, NY",
                "avatar_links": {
                    "thumb": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max",
                    "small": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=400&fit=max",
                    "medium": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max",
                    "large": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy",
                    "raw": "https://images.fok.al/avatar/devinmcgloin"
                },
                "images_links": [
                    "https://api.fok.al/v0/images/DWzfwTCaFIXq",
                    "https://api.fok.al/v0/images/zTWfoZXJwlOT",
                    "https://api.fok.al/v0/images/UmCoFGzEVUIc",
                    "https://api.fok.al/v0/images/LVXlAOlmkTKR",
                    "https://api.fok.al/v0/images/edziXgZtrysX",
                    "https://api.fok.al/v0/images/SHqZVnQXJObk",
                    "https://api.fok.al/v0/images/ADZtkxuhvqke",
                    "https://api.fok.al/v0/images/DjXiFqiVgFmX",
                    "https://api.fok.al/v0/images/bVQOctiXBTPw",
                    "https://api.fok.al/v0/images/tcNgvMvItujL",
                    "https://api.fok.al/v0/images/kwvHKBzTXkFe",
                    "https://api.fok.al/v0/images/pjQYthDqvzyv",
                    "https://api.fok.al/v0/images/pAZSFKAMqgMO",
                    "https://api.fok.al/v0/images/aGTfljGAqmxR",
                    "https://api.fok.al/v0/images/jjXiNDWEXhdi",
                    "https://api.fok.al/v0/images/dPdrDMJZWugx",
                    "https://api.fok.al/v0/images/GNxMVGjvaKwI",
                    "https://api.fok.al/v0/images/JRWZqSsZTRYg",
                    "https://api.fok.al/v0/images/VmCJUtDkhxZK",
                    "https://api.fok.al/v0/images/zMANRzvPTkDF",
                    "https://api.fok.al/v0/images/XtMuhzUoietc",
                    "https://api.fok.al/v0/images/lzvSBEcEVBCr",
                    "https://api.fok.al/v0/images/vkNdnysMjfYC",
                    "https://api.fok.al/v0/images/oobIKfadRAAw",
                    "https://api.fok.al/v0/images/iFMzeQPUSLXa"
                ],
                "favorite_links": [
                    "https://api.fok.al/v0/images/kvYjDTJuJNnS"
                ],
                "featured": false,
                "admin": false,
                "created_at": "2017-06-29T05:33:39.926126Z",
                "last_modified": "2017-06-29T05:33:39.926126Z"
            },
            "featured": false,
            "stats": {
                "downloads": 0,
                "views": 5,
                "favorites": 0
            },
            "src_links": {
                "thumb": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max",
                "small": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=400&fit=max",
                "medium": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max",
                "large": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy",
                "raw": "https://images.fok.al/content/LVXlAOlmkTKR"
            },
            "metadata": {
                "aperture": 9,
                "exposure_time": "1/320",
                "focal_length": 19,
                "iso": 200,
                "make": "OLYMPUS IMAGING CORP.",
                "model": "E-M5",
                "lens_model": "OLYMPUS M.12-50mm F3.5-6.3",
                "pixel_xd": 4608,
                "pixel_yd": 3456,
                "capture_time": "2014-07-22T02:45:58Z",
                "location": {
                    "point": {
                        "SRID": 4326,
                        "X": -118.22682222222222,
                        "Y": 36.486625000000004
                    },
                    "description": null
                }
            }
        },
        {
            "id": "UmCoFGzEVUIc",
            "permalink": "https://api.fok.al/v0/images/UmCoFGzEVUIc",
            "publish_time": "2017-09-08T22:57:48.633285Z",
            "last_modified": "2017-09-08T22:57:48.633285Z",
            "landmarks": [],
            "colors": [
                {
                    "sRGB": {
                        "r": 67,
                        "g": 123,
                        "b": 186
                    },
                    "hex": "437BBA",
                    "hsv": {
                        "h": 211,
                        "s": 63,
                        "v": 72
                    },
                    "shade": "Grey",
                    "color_name": "San Marino",
                    "pixel_fraction": 0.081847005,
                    "score": 0.30975908
                },
                {
                    "sRGB": {
                        "r": 125,
                        "g": 118,
                        "b": 119
                    },
                    "hex": "7D7677",
                    "hsv": {
                        "h": 351,
                        "s": 5,
                        "v": 49
                    },
                    "shade": "Grey",
                    "color_name": "Concord",
                    "pixel_fraction": 0.16428855,
                    "score": 0.07652742
                },
                {
                    "sRGB": {
                        "r": 35,
                        "g": 88,
                        "b": 151
                    },
                    "hex": "235897",
                    "hsv": {
                        "h": 212,
                        "s": 76,
                        "v": 59
                    },
                    "shade": "Grey",
                    "color_name": "St Tropaz",
                    "pixel_fraction": 0.10939358,
                    "score": 0.17965417
                },
                {
                    "sRGB": {
                        "r": 102,
                        "g": 154,
                        "b": 204
                    },
                    "hex": "669ACC",
                    "hsv": {
                        "h": 209,
                        "s": 50,
                        "v": 80
                    },
                    "shade": "Grey",
                    "color_name": "Danube",
                    "pixel_fraction": 0.045184303,
                    "score": 0.17462033
                },
                {
                    "sRGB": {
                        "r": 132,
                        "g": 168,
                        "b": 200
                    },
                    "hex": "84A8C8",
                    "hsv": {
                        "h": 208,
                        "s": 33,
                        "v": 78
                    },
                    "shade": "Grey",
                    "color_name": "Polo Blue",
                    "pixel_fraction": 0.0349782,
                    "score": 0.10156319
                },
                {
                    "sRGB": {
                        "r": 155,
                        "g": 149,
                        "b": 150
                    },
                    "hex": "9B9596",
                    "hsv": {
                        "h": 350,
                        "s": 3,
                        "v": 60
                    },
                    "shade": "Grey",
                    "color_name": "Mountain Mist",
                    "pixel_fraction": 0.123067774,
                    "score": 0.03797412
                },
                {
                    "sRGB": {
                        "r": 152,
                        "g": 182,
                        "b": 209
                    },
                    "hex": "98B6D1",
                    "hsv": {
                        "h": 208,
                        "s": 27,
                        "v": 81
                    },
                    "shade": "Grey",
                    "color_name": "Rock Blue",
                    "pixel_fraction": 0.010107015,
                    "score": 0.030867552
                },
                {
                    "sRGB": {
                        "r": 94,
                        "g": 87,
                        "b": 87
                    },
                    "hex": "5E5757",
                    "hsv": {
                        "h": 0,
                        "s": 7,
                        "v": 36
                    },
                    "shade": "Grey",
                    "color_name": "Chicago",
                    "pixel_fraction": 0.07956798,
                    "score": 0.028953366
                },
                {
                    "sRGB": {
                        "r": 15,
                        "g": 64,
                        "b": 119
                    },
                    "hex": "0F4077",
                    "hsv": {
                        "h": 211,
                        "s": 87,
                        "v": 46
                    },
                    "shade": "Grey",
                    "color_name": "Midnight Blue",
                    "pixel_fraction": 0.18024178,
                    "score": 0.022477524
                },
                {
                    "sRGB": {
                        "r": 110,
                        "g": 126,
                        "b": 146
                    },
                    "hex": "6E7E92",
                    "hsv": {
                        "h": 213,
                        "s": 24,
                        "v": 57
                    },
                    "shade": "Grey",
                    "color_name": "Slate Gray",
                    "pixel_fraction": 0.016944114,
                    "score": 0.015326467
                }
            ],
            "tags": [
                "mountains",
                "sierras",
                "mount whitney",
                "mount langley"
            ],
            "labels": [
                {
                    "description": "mountainous landforms",
                    "score": 0.91993165
                },
                {
                    "description": "wilderness",
                    "score": 0.906365
                },
                {
                    "description": "sky",
                    "score": 0.8909347
                },
                {
                    "description": "mountain range",
                    "score": 0.8063167
                },
                {
                    "description": "mountain",
                    "score": 0.91543525
                },
                {
                    "description": "ridge",
                    "score": 0.94084543
                },
                {
                    "description": "badlands",
                    "score": 0.8738911
                },
                {
                    "description": "geological phenomenon",
                    "score": 0.77251685
                },
                {
                    "description": "massif",
                    "score": 0.76895565
                },
                {
                    "description": "summit",
                    "score": 0.7500282
                }
            ],
            "user": {
                "id": "devinmcgloin",
                "permalink": "https://api.fok.al/v0/users/devinmcgloin",
                "email": "devinmcgloin@gmail.com",
                "name": "Devin McGloin",
                "bio": "Working on Fokal",
                "url": "https://devinmcgloin.com",
                "location": "New York, NY",
                "avatar_links": {
                    "thumb": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max",
                    "small": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=400&fit=max",
                    "medium": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max",
                    "large": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy",
                    "raw": "https://images.fok.al/avatar/devinmcgloin"
                },
                "images_links": [
                    "https://api.fok.al/v0/images/DWzfwTCaFIXq",
                    "https://api.fok.al/v0/images/zTWfoZXJwlOT",
                    "https://api.fok.al/v0/images/UmCoFGzEVUIc",
                    "https://api.fok.al/v0/images/LVXlAOlmkTKR",
                    "https://api.fok.al/v0/images/edziXgZtrysX",
                    "https://api.fok.al/v0/images/SHqZVnQXJObk",
                    "https://api.fok.al/v0/images/ADZtkxuhvqke",
                    "https://api.fok.al/v0/images/DjXiFqiVgFmX",
                    "https://api.fok.al/v0/images/bVQOctiXBTPw",
                    "https://api.fok.al/v0/images/tcNgvMvItujL",
                    "https://api.fok.al/v0/images/kwvHKBzTXkFe",
                    "https://api.fok.al/v0/images/pjQYthDqvzyv",
                    "https://api.fok.al/v0/images/pAZSFKAMqgMO",
                    "https://api.fok.al/v0/images/aGTfljGAqmxR",
                    "https://api.fok.al/v0/images/jjXiNDWEXhdi",
                    "https://api.fok.al/v0/images/dPdrDMJZWugx",
                    "https://api.fok.al/v0/images/GNxMVGjvaKwI",
                    "https://api.fok.al/v0/images/JRWZqSsZTRYg",
                    "https://api.fok.al/v0/images/VmCJUtDkhxZK",
                    "https://api.fok.al/v0/images/zMANRzvPTkDF",
                    "https://api.fok.al/v0/images/XtMuhzUoietc",
                    "https://api.fok.al/v0/images/lzvSBEcEVBCr",
                    "https://api.fok.al/v0/images/vkNdnysMjfYC",
                    "https://api.fok.al/v0/images/oobIKfadRAAw",
                    "https://api.fok.al/v0/images/iFMzeQPUSLXa"
                ],
                "favorite_links": [
                    "https://api.fok.al/v0/images/kvYjDTJuJNnS"
                ],
                "featured": false,
                "admin": false,
                "created_at": "2017-06-29T05:33:39.926126Z",
                "last_modified": "2017-06-29T05:33:39.926126Z"
            },
            "featured": false,
            "stats": {
                "downloads": 0,
                "views": 4,
                "favorites": 0
            },
            "src_links": {
                "thumb": "https://images.fok.al/content/UmCoFGzEVUIc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max",
                "small": "https://images.fok.al/content/UmCoFGzEVUIc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=400&fit=max",
                "medium": "https://images.fok.al/content/UmCoFGzEVUIc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max",
                "large": "https://images.fok.al/content/UmCoFGzEVUIc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy",
                "raw": "https://images.fok.al/content/UmCoFGzEVUIc"
            },
            "metadata": {
                "aperture": 10,
                "exposure_time": "1/500",
                "focal_length": 12,
                "iso": 200,
                "make": "OLYMPUS IMAGING CORP.",
                "model": "E-M5",
                "lens_model": "OLYMPUS M.12-50mm F3.5-6.3",
                "pixel_xd": 4608,
                "pixel_yd": 3456,
                "capture_time": "2014-07-23T01:41:17Z",
                "location": {
                    "point": {
                        "SRID": 4326,
                        "X": -118.22682222222222,
                        "Y": 36.486625000000004
                    },
                    "description": null
                }
            }
        }
    ],
    "users": [],
    "tags": [
        {
            "id": "sierras",
            "permalink": "https://api.fok.al/v0/tags/sierras",
            "image": {
                "id": "LVXlAOlmkTKR",
                "permalink": "https://api.fok.al/v0/images/LVXlAOlmkTKR",
                "publish_time": "2017-09-08T22:57:31.800226Z",
                "last_modified": "2017-09-08T22:57:31.800226Z",
                "landmarks": [],
                "colors": [
                    {
                        "sRGB": {
                            "r": 103,
                            "g": 110,
                            "b": 58
                        },
                        "hex": "676E3A",
                        "hsv": {
                            "h": 68,
                            "s": 47,
                            "v": 43
                        },
                        "shade": "Grey",
                        "color_name": "Costa Del Sol",
                        "pixel_fraction": 0.013575109,
                        "score": 0.18298304
                    },
                    {
                        "sRGB": {
                            "r": 86,
                            "g": 88,
                            "b": 79
                        },
                        "hex": "56584F",
                        "hsv": {
                            "h": 73,
                            "s": 10,
                            "v": 34
                        },
                        "shade": "Grey",
                        "color_name": "Fuscous Gray",
                        "pixel_fraction": 0.19262782,
                        "score": 0.108436346
                    },
                    {
                        "sRGB": {
                            "r": 199,
                            "g": 194,
                            "b": 186
                        },
                        "hex": "C7C2BA",
                        "hsv": {
                            "h": 36,
                            "s": 6,
                            "v": 78
                        },
                        "shade": "White",
                        "color_name": "Cotton Seed",
                        "pixel_fraction": 0.1621086,
                        "score": 0.088675156
                    },
                    {
                        "sRGB": {
                            "r": 89,
                            "g": 98,
                            "b": 46
                        },
                        "hex": "59622E",
                        "hsv": {
                            "h": 70,
                            "s": 53,
                            "v": 38
                        },
                        "shade": "Grey",
                        "color_name": "Woodland",
                        "pixel_fraction": 0.031609196,
                        "score": 0.15638207
                    },
                    {
                        "sRGB": {
                            "r": 82,
                            "g": 92,
                            "b": 49
                        },
                        "hex": "525C31",
                        "hsv": {
                            "h": 73,
                            "s": 46,
                            "v": 36
                        },
                        "shade": "Grey",
                        "color_name": "Woodland",
                        "pixel_fraction": 0.011791518,
                        "score": 0.107565224
                    },
                    {
                        "sRGB": {
                            "r": 116,
                            "g": 115,
                            "b": 105
                        },
                        "hex": "747369",
                        "hsv": {
                            "h": 54,
                            "s": 9,
                            "v": 45
                        },
                        "shade": "Grey",
                        "color_name": "Flint",
                        "pixel_fraction": 0.08977408,
                        "score": 0.07946398
                    },
                    {
                        "sRGB": {
                            "r": 122,
                            "g": 121,
                            "b": 92
                        },
                        "hex": "7A795C",
                        "hsv": {
                            "h": 57,
                            "s": 24,
                            "v": 47
                        },
                        "shade": "Grey",
                        "color_name": "Flax Smoke",
                        "pixel_fraction": 0.02705113,
                        "score": 0.05329309
                    },
                    {
                        "sRGB": {
                            "r": 164,
                            "g": 159,
                            "b": 151
                        },
                        "hex": "A49F97",
                        "hsv": {
                            "h": 36,
                            "s": 7,
                            "v": 64
                        },
                        "shade": "Grey",
                        "color_name": "Dawn",
                        "pixel_fraction": 0.14070551,
                        "score": 0.042474333
                    },
                    {
                        "sRGB": {
                            "r": 111,
                            "g": 119,
                            "b": 76
                        },
                        "hex": "6F774C",
                        "hsv": {
                            "h": 71,
                            "s": 36,
                            "v": 46
                        },
                        "shade": "Grey",
                        "color_name": "Go Ben",
                        "pixel_fraction": 0.00307174,
                        "score": 0.031641234
                    },
                    {
                        "sRGB": {
                            "r": 89,
                            "g": 90,
                            "b": 69
                        },
                        "hex": "595A45",
                        "hsv": {
                            "h": 62,
                            "s": 23,
                            "v": 35
                        },
                        "shade": "Grey",
                        "color_name": "Finch",
                        "pixel_fraction": 0.020610385,
                        "score": 0.030743629
                    }
                ],
                "tags": [
                    "lake",
                    "sierras",
                    "california",
                    "grass"
                ],
                "labels": [
                    {
                        "description": "waterway",
                        "score": 0.91011
                    },
                    {
                        "description": "water",
                        "score": 0.8421425
                    },
                    {
                        "description": "water resources",
                        "score": 0.90767175
                    },
                    {
                        "description": "lake",
                        "score": 0.89586926
                    },
                    {
                        "description": "nature reserve",
                        "score": 0.9179224
                    },
                    {
                        "description": "wetland",
                        "score": 0.8099532
                    },
                    {
                        "description": "bank",
                        "score": 0.8332987
                    },
                    {
                        "description": "river",
                        "score": 0.8323779
                    },
                    {
                        "description": "reservoir",
                        "score": 0.80503726
                    },
                    {
                        "description": "inlet",
                        "score": 0.6523049
                    }
                ],
                "user": {
                    "id": "devinmcgloin",
                    "permalink": "https://api.fok.al/v0/users/devinmcgloin",
                    "email": "devinmcgloin@gmail.com",
                    "name": "Devin McGloin",
                    "bio": "Working on Fokal",
                    "url": "https://devinmcgloin.com",
                    "location": "New York, NY",
                    "avatar_links": {
                        "thumb": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max",
                        "small": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=400&fit=max",
                        "medium": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max",
                        "large": "https://images.fok.al/avatar/devinmcgloin?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy",
                        "raw": "https://images.fok.al/avatar/devinmcgloin"
                    },
                    "images_links": [
                        "https://api.fok.al/v0/images/DWzfwTCaFIXq",
                        "https://api.fok.al/v0/images/zTWfoZXJwlOT",
                        "https://api.fok.al/v0/images/UmCoFGzEVUIc",
                        "https://api.fok.al/v0/images/LVXlAOlmkTKR",
                        "https://api.fok.al/v0/images/edziXgZtrysX",
                        "https://api.fok.al/v0/images/SHqZVnQXJObk",
                        "https://api.fok.al/v0/images/ADZtkxuhvqke",
                        "https://api.fok.al/v0/images/DjXiFqiVgFmX",
                        "https://api.fok.al/v0/images/bVQOctiXBTPw",
                        "https://api.fok.al/v0/images/tcNgvMvItujL",
                        "https://api.fok.al/v0/images/kwvHKBzTXkFe",
                        "https://api.fok.al/v0/images/pjQYthDqvzyv",
                        "https://api.fok.al/v0/images/pAZSFKAMqgMO",
                        "https://api.fok.al/v0/images/aGTfljGAqmxR",
                        "https://api.fok.al/v0/images/jjXiNDWEXhdi",
                        "https://api.fok.al/v0/images/dPdrDMJZWugx",
                        "https://api.fok.al/v0/images/GNxMVGjvaKwI",
                        "https://api.fok.al/v0/images/JRWZqSsZTRYg",
                        "https://api.fok.al/v0/images/VmCJUtDkhxZK",
                        "https://api.fok.al/v0/images/zMANRzvPTkDF",
                        "https://api.fok.al/v0/images/XtMuhzUoietc",
                        "https://api.fok.al/v0/images/lzvSBEcEVBCr",
                        "https://api.fok.al/v0/images/vkNdnysMjfYC",
                        "https://api.fok.al/v0/images/oobIKfadRAAw",
                        "https://api.fok.al/v0/images/iFMzeQPUSLXa"
                    ],
                    "favorite_links": [
                        "https://api.fok.al/v0/images/kvYjDTJuJNnS"
                    ],
                    "featured": false,
                    "admin": false,
                    "created_at": "2017-06-29T05:33:39.926126Z",
                    "last_modified": "2017-06-29T05:33:39.926126Z"
                },
                "featured": false,
                "stats": {
                    "downloads": 0,
                    "views": 5,
                    "favorites": 0
                },
                "src_links": {
                    "thumb": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max",
                    "small": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=400&fit=max",
                    "medium": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max",
                    "large": "https://images.fok.al/content/LVXlAOlmkTKR?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy",
                    "raw": "https://images.fok.al/content/LVXlAOlmkTKR"
                },
                "metadata": {
                    "aperture": 9,
                    "exposure_time": "1/320",
                    "focal_length": 19,
                    "iso": 200,
                    "make": "OLYMPUS IMAGING CORP.",
                    "model": "E-M5",
                    "lens_model": "OLYMPUS M.12-50mm F3.5-6.3",
                    "pixel_xd": 4608,
                    "pixel_yd": 3456,
                    "capture_time": "2014-07-22T02:45:58Z",
                    "location": {
                        "point": {
                            "SRID": 4326,
                            "X": -118.22682222222222,
                            "Y": 36.486625000000004
                        },
                        "description": null
                    }
                }
            },
            "count": 2
        }
    ]
}

class ExploreScene extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            images: [],
            users: [],
            tags: []
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="pa3 pa4-ns sans-serif">
                <h1 className={'f2 fw5 measure lh-copy'}>Explore</h1>
                <p className={'f5 measure lh-copy'}>View the popular searches and locations on Fokal and find new images.</p>

                <div className={'pv3'}>
                    <h2 className={'f3 fw6 measure lh-copy'}>Mountains</h2>
                    <p className={'f5 measure-wide lh-copy'}>Explore images from iconic mountain ranges around the world.</p>
                      <p className={'f5 measure-wide lh-copy'}>
                          <Link to={'/search/images?q=mountains'} className={'link dim hover black underline'}>Explore More</Link>
                      </p>
                    <GridCollection cards={sierras.images.map(i => <ImageCardSmall key={i.id} image={i}/>)}/>
                </div>

                <div className={'pv3'}>
                    <h2 className={'f3 fw6 measure lh-copy'}>Architecture</h2>
                    <p className={'f5 measure-wide lh-copy'}>Find beautiful structures from all corners of the globe.</p>
                    <GridCollection cards={sierras.images.map(i => <ImageCardSmall key={i.id} image={i}/>)}/>
                </div>

                <div className={'pv3'}>
                    <h2 className={'f3 fw6 measure lh-copy'}>Flatlands</h2>
                    <p className={'f5 measure-wide lh-copy'}>Run wild in the open planes.</p>
                    <GridCollection cards={sierras.images.map(i => <ImageCardSmall key={i.id} image={i}/>)}/>
                </div>
            </div>
        )
    }
}

export {ExploreScene}
