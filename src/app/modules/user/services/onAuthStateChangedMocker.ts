export function onAuthStateChangedMocker  (auth,next){
    console.log("onauthStateChangedocker @#@")
    const user = {
        "uid": "YxeXtaatdmQT5Rgp6BWqV3ameVe2",
        "email": "damicogiuseppe77@gmail.com",
        "emailVerified": false,
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "damicogiuseppe77@gmail.com",
                "displayName": null,
                "email": "damicogiuseppe77@gmail.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        enabledFunctions:[
            {
                "endTime": 5832408720000,
                "key": "HhdvZa2oc8lnEiPVm43s"
            },
            {
                "endTime": 5958635580000,
                "key": "wIiuIMxTG2FfQkMjkqVW"
            },
            {
                "key": "Ep7AayZBJm40FCwPkA5p",
                "endTime": 5958635580000
            },
            {
                "key": "yjhQdLm9fdozJ2tDzw6B",
                "endTime": 5958635640000
            },
            {
                "key": "Uj7rcGbrKGH5QtN29quU",
                "endTime": 3058361640000
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AMf-vBwn1wyS2krp1NqKIsk8jXS9Tvv0jU9CP0ooJWOrAxz6EqrMBtOFhkqucl02TtawvcfrkxW0xvgw6SNAaI-qfY0vLjj-t-NWKk-k7awrPeKXYueKbdln46zrXMscn9ehimyztyN8u6gZjUkOTG-EBJPglwNVWp3UsD8L_uttqRM2cE5OKVMe3RbeSAmNPobPWshPDNgMvHYOhfokjKK7slGmXDlONmtbw_bZpbn_2CdxEZfyduo",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ0ZmJkZTdhZGY0ZTU3YWYxZWE4MzAzNmJmZjdkMzUxNTk3ZTMzNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGlnaXRhbGFpZC02MTAxMSIsImF1ZCI6ImRpZ2l0YWxhaWQtNjEwMTEiLCJhdXRoX3RpbWUiOjE3MDAwNDczMDcsInVzZXJfaWQiOiJZeGVYdGFhdGRtUVQ1UmdwNkJXcVYzYW1lVmUyIiwic3ViIjoiWXhlWHRhYXRkbVFUNVJncDZCV3FWM2FtZVZlMiIsImlhdCI6MTcwMDA0NzMwNywiZXhwIjoxNzAwMDUwOTA3LCJlbWFpbCI6ImRhbWljb2dpdXNlcHBlNzdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRhbWljb2dpdXNlcHBlNzdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.aDJw76oFluHG2WJuxCt3Pked4CChy8b0rENBErdtc9LCNvgwwvBqJ6KpHqoPX41a96V-kzAw0Ne-3DCdX-o3tttSkz5ulMF-CBPlQD9c9bnz5QCiQ4xelTGu5ESBDN0jkwNI-fVXslccZqvFJ9IVXotspnJuTAdD_GVWxadjslsAfFE4tcbkAAlBdWZ4goIICVWmtCOsKmF88KXN_b5cDONwOjz6VQPg846exEwXIvJY64DaNgDi27aGBRIyiW99m979qNGLS2qQsOe-oLpUwb1FfkU1fz9uO6Rqg6SZyHDhvo-gTp3m32CBGd_cLsmuRZz5fUSQfnKAjKcwX9sjKg",
            "expirationTime": 1700050907635
        },
        "createdAt": "1689684069079",
        "lastLoginAt": "1700047239262",
        "apiKey": "AIzaSyAgHxOZVqV16CyLhMjtPhqOW0FEHYd_5gk",
        "appName": "[DEFAULT]"
    }
    next(user)

}