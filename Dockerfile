# Gunakan image Node.js versi terbaru yang tersedia
FROM node:20

# Tambahkan zona waktu
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y install tzdata
RUN rm /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Jakarta /etc/localtime

# Atur working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy seluruh file aplikasi ke dalam working directory container
COPY . .

# Ekspose port yang akan digunakan oleh Jekyll
EXPOSE 8080

ENV HOST 0.0.0.0


CMD [ "node", "app.js", "--host", "0.0.0.0", "--port", "8080" ]
