# My Dashboard - Tienda Nube Integration

Este proyecto es una integración con la API de Tienda Nube utilizando **Next.js**, **Convex** y **ShadCN UI**. Permite ver y gestionar productos, órdenes y categorías en tiempo real.

---

## 🚀 Desarrollo

Para iniciar el servidor de desarrollo, ejecutá:

```bash
pnpm run dev
Luego abrí http://localhost:3000 en tu navegador.

📦 Producción (Configuración de Tienda Nube)
Para correr esta app en producción con datos reales, seguí estos pasos:

1. Crear cuenta y aplicación en Tienda Nube
Registrate en Tienda Nube Developers

Creá una nueva aplicación

Dentro de la aplicación, creá una tienda demo

2. Configurar variables de entorno
Reemplazá las siguientes variables en tu .env.local (y luego en Vercel u otro entorno de producción):

ini
Mostrar siempre los detalles

Copiar
TIENDANUBE_CLIENT_ID=TU_CLIENT_ID
TIENDANUBE_CLIENT_SECRET=TU_CLIENT_SECRET
TIENDANUBE_ACCESS_TOKEN=TO_BE_GENERATED
STORE_ID=TU_STORE_ID
EMAIL=TU_EMAIL
3. Obtener TIENDANUBE_ACCESS_TOKEN
En la configuración de tu app en Tienda Nube, hacé clic en "Conectar con la API"

Presioná el botón "Instalar aplicación"

Se abrirá una ventana con un código code (válido solo por 5 minutos)

Ejecutá el script:

bash

Copiar
npx tsx scripts/generateAccessToken.ts
Antes de ejecutarlo, asegurate de reemplazar en ese script:

Copiar
client_id
client_secret
code
Te devolverá el access_token y store_id. Usalos para actualizar las variables TIENDANUBE_ACCESS_TOKEN y STORE_ID.

4. Registrar webhooks
Ejecutá el siguiente script:

Copiar
npx tsx scripts/registerWebhook.ts
Esto creará todos los webhooks necesarios para recibir eventos de productos, órdenes y categorías.

🌐 Despliegue
En Vercel, recordá configurar las variables de entorno mencionadas para que los webhooks funcionen correctamente.
