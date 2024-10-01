# node.js docker image
FROM node:18-alpine

# container kansio koodeille
WORKDIR /app

# kopioidaan tästä kansiosta tiedostot containeriin
COPY package*.json ./

# suorittaa asennuksen
RUN npm install

# portti
EXPOSE 3001

# komentokehote komento, jonka container suorittaa
CMD ["npm", "run", "dev"]