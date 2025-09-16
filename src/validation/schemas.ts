import { z } from "zod";

export const ensayoPostRequestBodySchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),
  formula: z.string().min(1, { message: "La fórmula es obligatoria" }),
  pruebas: z
    .array(
      z.object({
        descripcion: z
          .string()
          .min(1, { message: "La descripción de la prueba es obligatoria" }),
        valor: z.number(),
      })
    )
    .optional(),
});

export const ensayoPutRequestBodySchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }).optional(),
  descripcion: z
    .string()
    .min(1, { message: "La descripción es obligatoria" })
    .optional(),
  formula: z
    .string()
    .min(1, { message: "La fórmula es obligatoria" })
    .optional(),

  // Pruebas a crear (deben tener ambos campos)
  pruebasACrear: z
    .array(
      z.object({
        descripcion: z
          .string()
          .min(1, { message: "La descripción de la prueba es obligatoria" }),
        valor: z.number(),
      })
    )
    .optional(),

  // Pruebas a eliminar (solo codigos)
  pruebasAEliminar: z.array(z.number()).optional(),
});

export type EnsayoPostRequestBody = z.infer<typeof ensayoPostRequestBodySchema>;
export type EnsayoPutRequestBody = z.infer<typeof ensayoPutRequestBodySchema>;
