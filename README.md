# Proyecto de Tesis de Grado: Sistema de Gestión de Ganado

## Descripción

Este proyecto es un sistema de gestión de ganado desarrollado como parte de mi tesis de grado. La aplicación permite a los usuarios gestionar información sobre vacas, incluyendo datos sobre partos, palpaciones, producción de leche y más. La aplicación está construida utilizando Angular y Ionic para el frontend, y se comunica con un backend alojado en Railway.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de carpetas:

```
src/
├── app/
│   ├── components/
│   │   ├── menu/
│   │   └── pop-over-info/
│   ├── pages/
│   │   ├── actualizar-vaca/
│   │   ├── calculadora/
│   │   ├── crear-vaca/
│   │   ├── home/
│   │   ├── info-vaca/
│   │   ├── lista-vacas/
│   │   ├── mesleche/
│   │   ├── palpacion/
│   │   ├── parto/
│   │   └── profile/
│   ├── services/
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
├── assets/
│   ├── shapes.svg
│   └── icon/
│       └── svg/
├── environments/
│   ├── environment.prod.ts
│   └── environment.ts
├── theme/
│   └── variables.scss
├── global.scss
├── index.html
├── main.ts
├── polyfills.ts
├── test.ts
└── zone-flags.ts
```



## Uso

La aplicación permite a los usuarios realizar las siguientes acciones:

- **Inicio de Sesión**: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.
- **Gestión de Vacas**: Los usuarios pueden agregar, actualizar y ver información sobre vacas.
- **Registro de Partos y Palpaciones**: Los usuarios pueden registrar y actualizar información sobre partos y palpaciones.
- **Producción de Leche**: Los usuarios pueden registrar y actualizar la producción de leche mensual.
- **Reportes**: Los usuarios pueden generar reportes sobre diferentes aspectos del ganado.
