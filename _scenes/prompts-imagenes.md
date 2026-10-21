# Wilk Works · Prompts para imágenes de marca

Concepto: **el código es la magia de nuestro mundo**. Escribir algo con precisión hace que exista; lo conocido y lo oculto; unir dos cosas con un vínculo. Las referencias místicas son abstractas: nada de ojos, tarot, runas literales ni personajes.

## Cómo usarlos

1. **Pega siempre el BLOQUE DE ESTILO** al final de cada prompt. Es lo que mantiene todas las imágenes coherentes entre sí.
2. Genera **4 variantes** por pieza la primera vez (`n=4` o "4 versiones") y elige una.
3. Cuando tengas una imagen que te guste (por ejemplo el logo), úsala como **imagen de referencia** en las siguientes y escribe al inicio: `Reference image 1: the Wilk Works logo — keep its shape and colors exactly.`
4. Si sale casi bien, edita en lugar de regenerar, con esta línea: `Change: [lo que quieres cambiar]. Keep unchanged: composition, colors, lighting, all other elements.`
5. Para logos e íconos pide fondo liso y quita el fondo después (remove.bg, Photopea o Canva). Luego conviene redibujarlo como vector (SVG). Yo puedo hacerlo a partir de la imagen.

Funcionan con Midjourney, DALL·E / ChatGPT, Gemini, Ideogram, Leonardo o Flux. Para piezas **con texto** (portadas, tarjetas) usa Ideogram o ChatGPT, que escriben texto mejor.

---

## BLOQUE DE ESTILO (pégalo en todos)

```
Visual identity: "code as the magic of our world". Dark indigo-black background (#0b0a14) with soft drifting grey fog. Primary color violet (#8b5cf6), secondary electric blue (#5b8cff), with small precise accents of warm amber (#f5c542) used like sparks of light. Clean, modern and technical, with a quiet sense of mystery: thin luminous lines, nodes connected like a graph, faint monospace code fragments dissolving into mist. Elegant and restrained, never cluttered, never cheesy. No eyes, no tarot cards, no skulls, no fantasy characters, no wizards. No watermark, no extra text, no third-party logos.
```

---

## 1. Logo (símbolo)

**Relación de aspecto:** 1:1 · **Variantes:** 4

```
Create an original, non-infringing logo symbol for "Wilk Works", a small software and IT company whose idea is that code works like magic: writing something precisely makes it real. The mark is a stylized letter W built from five nodes connected by straight luminous lines, like a constellation or a circuit graph; the central node is slightly larger and glows warm amber, the other nodes are hollow rings in violet fading to blue. Clean vector-like geometry, strong silhouette, balanced negative space, consistent stroke width, rounded line caps. It must read clearly at 16 pixels and at billboard size. Flat colors with at most one subtle gradient from violet to blue. Single centered mark with generous padding on a plain solid #0b0a14 background.
```

**Variante con corchetes (si prefieres más "código"):**

```
Create an original logo symbol for "Wilk Works": a geometric letter W drawn with one continuous luminous line, enclosed between a pair of angle brackets < > like a line of code. A small amber block cursor sits just below the center of the W, as if the letter was just typed into existence. Clean vector geometry, rounded caps, even stroke weight, violet-to-blue gradient on the W, muted violet brackets, amber cursor. Reads at 16 px. Single centered mark, generous padding, plain solid #0b0a14 background.
```

## 2. Logo horizontal (símbolo + nombre)

**Relación de aspecto:** 4:1 · Ideogram o ChatGPT

```
A horizontal logo lockup: on the left, the Wilk Works symbol (a letter W made of connected nodes with an amber center node, from reference image 1); on the right, the words "Wilk Works" (EXACT, verbatim) in a bold geometric sans-serif with slightly tight letter spacing, in near-white #e9e7f5. Beneath the name, the small text "SOFTWARE · TI" (EXACT) in a monospace font with wide letter spacing, muted lavender. Perfectly aligned, vertically centered, generous padding, plain #0b0a14 background. Ensure all text appears once and is perfectly legible.
```

Pide también una versión para fondo claro: `Same lockup on a plain #f4f2fb background, name in deep ink #1a1630.`

## 3. Ícono de app / favicon / foto de perfil (WhatsApp, LinkedIn)

**Relación de aspecto:** 1:1

```
An app icon for Wilk Works: the W-of-connected-nodes symbol from reference image 1, centered inside a rounded square with a deep indigo background (#0b0a14) and a very soft violet glow behind the mark. Thin fog wisps at the edges. Flat, crisp, high contrast, readable when shrunk to a small circle. No text.
```

## 4. Imagen para compartir el enlace (Open Graph: WhatsApp, LinkedIn, Facebook)

**Relación de aspecto:** 1200×630 (≈1.91:1) · Ideogram o ChatGPT

```
A wide social sharing banner for the website of Wilk Works. Left half: the headline "El código es la magia de nuestro mundo" (EXACT, verbatim) in a bold geometric sans-serif, near-white, large display size, set over two lines; below it the small text "wilk-works.vercel.app" (EXACT) in monospace, lavender. Right half: a luminous sphere made of thousands of tiny monospace characters, carved by a flowing lattice pattern, violet and blue with a few amber sparks, half-dissolving into grey fog. Dark indigo background, subtle grid lines fading out. Generous margins, nothing touching the edges. Ensure text appears once and is perfectly legible.
```

## 5. Fondo principal (hero) del sitio

**Relación de aspecto:** 16:9 · resolución máxima

```
A wide cinematic background image: an endless dark indigo space filled with slowly drifting grey fog. Inside the fog, faint lines of code float at different depths, the far ones blurred and dim, the near ones sharp; in a few places the code bends into thin glowing violet and blue threads that connect into small constellations of nodes, with tiny amber points where threads meet. The center and left side stay calm and darker so a headline can sit on top; the visual interest gathers on the right. Soft volumetric light from upper right. Minimal, atmospheric, premium.
```

## 6. Ilustraciones de servicios (una por servicio)

**Relación de aspecto:** 12:7 (o 16:9) · usa la misma frase inicial en las seis para que se vean como serie:

> `An isometric 3D illustration in the Wilk Works style, with a matte dark indigo base, glowing violet and blue edges, small amber highlights, floating in soft grey fog, with faint code fragments around it.`

| Servicio | Añade después de la frase inicial |
|---|---|
| Desarrollo web | `A laptop and a phone side by side, both showing the same simple online store; thin luminous lines flow from a floating block of code into both screens, as if the code is building the pages.` |
| Apps móviles | `A smartphone standing upright showing a calendar with one day highlighted in amber; a small chat bubble and a bell notification float beside it, connected to the phone by glowing threads.` |
| Sistemas a medida | `A wide monitor showing a dashboard with bar charts and a table; a stack of loose spreadsheet sheets on the left transforms, sheet by sheet, into clean glowing blocks entering the monitor.` |
| Cloud y DevOps | `Three small server racks on the left send streams of light into a stylized cloud made of glowing wireframe; inside the cloud sit three small containers, one amber. A shield icon floats nearby.` |
| Soporte TI | `An office desk with a printer, a router with signal waves and a laptop; a glowing wrench-shaped cursor hovers over them, and each device has a small green check mark.` |
| Consultoría | `A table with a large sheet showing a roadmap of three columns of cards, connected by arrows; one card glows amber as the first priority; a pen and a cup of coffee rest beside it.` |

## 7. Portada de LinkedIn

**Tamaño:** 1584×396 (4:1) · Ideogram o ChatGPT

```
A very wide LinkedIn cover banner. Background: dark indigo with drifting grey fog and faint floating code fragments. On the right third, a long thread of light runs horizontally and ties together small glowing nodes, one amber. On the left, leave the bottom-left corner empty (the profile photo covers it). In the center-left, the text "Software a medida · Cloud · Soporte TI" (EXACT, verbatim) in a clean geometric sans-serif, near-white, medium size. Ensure text appears once and is perfectly legible.
```

## 8. Tarjeta de presentación

**Relación de aspecto:** 85×55 mm (≈ 1.55:1) · genera anverso y reverso por separado

```
Front of a premium business card, flat and facing the camera: deep indigo matte paper with a subtle soft-touch texture, the Wilk Works symbol (reference image 1) centered in spot violet-to-blue foil with an amber center dot. No other text.
```

```
Back of the same business card: deep indigo matte paper. Left-aligned in a clean sans-serif, near-white: "Wilk Works" (EXACT) in bold; below it in smaller monospace lavender: "+51 976 293 223" (EXACT) and "wilk-works.vercel.app" (EXACT). A thin luminous line with three small nodes runs along the bottom edge, one amber. Ensure all text is perfectly legible.
```

## 9. Publicaciones para redes (plantilla reutilizable)

**Relación de aspecto:** 4:5 (Instagram/LinkedIn) o 9:16 (historias)

```
A social media post background in the Wilk Works style: dark indigo with soft grey fog; at the bottom, a horizon of tiny monospace characters that rises and dissolves into the mist, violet and blue, with a few amber sparks. The upper two thirds stay calm and empty to place a headline later. Minimal, atmospheric.
```

---

## Si algo sale mal

- **Sale "fantasía" o recargado:** añade `minimal, technical, product-design style, like a modern software company website`.
- **El logo tiene demasiado detalle:** añade `fewer elements, thicker lines, must work as a 16 px favicon`.
- **El texto sale mal escrito:** acórtalo, ponlo entre comillas y añade `spelled W-I-L-K  W-O-R-K-S`.
- **Colores fuera de marca:** repite los códigos HEX y añade `strictly limited palette: #0b0a14, #8b5cf6, #5b8cff, #f5c542, #e9e7f5`.
