import { prisma } from "../prisma/prisma";
import { EnsayoPutRequestBody } from "../validation/schemas";
import { getFechaArgentina } from "../utils/date";

export async function createEnsayo(data: {
  nombre: string;
  descripcion: string;
  formula: string;
  pruebas?: { descripcion: string; valor: number }[];
}) {
  return await prisma.ensayo.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      formula: data.formula,
      fechaCreacion: getFechaArgentina(),
      pruebas: data.pruebas
        ? {
            create: data.pruebas.map((p) => ({
              descripcion: p.descripcion,
              valor: p.valor,
            })),
          }
        : undefined,
    },
    include: { pruebas: true },
  });
}

export async function getEnsayos() {
  return await prisma.ensayo.findMany({ include: { pruebas: true } });
}

export async function getEnsayoByCodigo(codigo: number) {
  return await prisma.ensayo.findUnique({
    where: { codigo },
    include: { pruebas: true },
  });
}

export async function updateEnsayo(codigo: number, data: EnsayoPutRequestBody) {
  const ensayoToUpdate = await prisma.ensayo.findUnique({
    where: { codigo },
  });

  if (!ensayoToUpdate) {
    return null; // Ensayo no encontrado
  }

  return await prisma.ensayo.update({
    where: { codigo },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      formula: data.formula,

      pruebas: {
        // Crear nuevas pruebas
        create: data.pruebasACrear
          ? data.pruebasACrear.map((p) => ({
              descripcion: p.descripcion,
              valor: p.valor,
            }))
          : undefined,

        // Eliminar pruebas
        deleteMany: data.pruebasAEliminar
          ? { codigo: { in: data.pruebasAEliminar } }
          : undefined,
      },
    },
    include: { pruebas: true },
  });
}

export async function deleteEnsayo(codigo: number) {
  const ensayoToDelete = await prisma.ensayo.findUnique({
    where: { codigo },
  });

  if (!ensayoToDelete) {
    return null; // Ensayo no encontrado
  }

  return await prisma.ensayo.delete({
    where: { codigo },
    include: { pruebas: true },
  });
}
