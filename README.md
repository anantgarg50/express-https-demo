# express-https-demo

Bare minimum setup of HTTPs for Express and auto-redirects from HTTP to HTTPs

---

## Getting Started

### Prerequisite :-

- Node >= v.10.13.0
- Yarn >= 1.12.3 (Recommended)  
  or
- npm >= 6.4.1

### Getting the Code :-
Clone this repository using :
```
$ git clone https://github.com/anantgarg50/express-https-demo.git

    or

$ git clone git@github.com:anantgarg50/express-https-demo.git
```  

### Installing dependencies :-
Change working directory to `express-https-demo`, using :  
```
cd express-https-demo
```

Install dependencies :  
```
yarn install
    
    or

npm install
```

### Generating the self-signed SSL certificate and key :-

Refer [this](https://flaviocopes.com/express-https-self-signed-certificate/) guide.

### Start Development Server :-

`yarn dev`  

**Note :-** Ports number from 0 - 1024 are privileged for many system services, thus requires elevated (root/admin) privileges.

## Authors

- **Anant Garg** - _Initial Work_ - [Anant Garg](https://github.com/anantgarg50)
