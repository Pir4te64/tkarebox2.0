// src/stores/historialMedicoStore.js
import { create } from "zustand";

const useHistorialMedicoStore = create((set) => ({
  // Estado inicial para el historial. Puedes ajustarlo según la estructura que tengas.
  historial: {},

  // Establece el historial completo (por ejemplo, luego de cargarlo desde la API)
  setHistorial: (nuevoHistorial) => set({ historial: nuevoHistorial }),

  // Actualiza un campo simple del historial (por ejemplo, specialty, treatingPhysician, etc.)
  updateField: (field, value) =>
    set((state) => ({
      historial: {
        ...state.historial,
        [field]: value,
      },
    })),

  // Actualiza un valor dentro de un array simple (por ejemplo, un síntoma o diagnóstico)
  updateArrayField: (field, index, value) =>
    set((state) => {
      const arrayActual = state.historial[field] || [];
      const newArray = [...arrayActual];
      newArray[index] = value;
      return {
        historial: {
          ...state.historial,
          [field]: newArray,
        },
      };
    }),

  // Actualiza un campo dentro de un objeto anidado en un array (por ejemplo, tratamientos)
  updateTreatment: (index, field, value) =>
    set((state) => {
      const treatments = state.historial.treatments || [];
      const newTreatments = treatments.map((treatment, i) =>
        i === index ? { ...treatment, [field]: value } : treatment
      );
      return {
        historial: {
          ...state.historial,
          treatments: newTreatments,
        },
      };
    }),

  // Puedes crear funciones similares para followUps, orders, etc.
  updateFollowUp: (index, field, value) =>
    set((state) => {
      const followUps = state.historial.followUps || [];
      const newFollowUps = followUps.map((followUp, i) =>
        i === index ? { ...followUp, [field]: value } : followUp
      );
      return {
        historial: {
          ...state.historial,
          followUps: newFollowUps,
        },
      };
    }),

  updateOrder: (index, field, value) =>
    set((state) => {
      const orders = state.historial.orders || [];
      const newOrders = orders.map((order, i) =>
        i === index ? { ...order, [field]: value } : order
      );
      return {
        historial: {
          ...state.historial,
          orders: newOrders,
        },
      };
    }),

  // Función para reiniciar el historial (opcional)
  resetHistorial: () => set({ historial: {} }),
}));

export default useHistorialMedicoStore;
