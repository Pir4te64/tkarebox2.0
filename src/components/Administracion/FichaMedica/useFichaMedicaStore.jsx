import { create } from "zustand";

export const useFichaMedicaStore = create((set) => ({
  // Estados existentes (fecha, peso, altura, etc.)
  fechaNac: "",
  peso: "",
  altura: "",
  tipoSangre: "",
  medicationAllergies: [],
  otherAllergies: [],

  // NUEVO: Lista de enfermedades crónicas
  chronicDiseases: [],

  // Setters de campos existentes
  setFechaNac: (value) => set({ fechaNac: value }),
  setPeso: (value) => set({ peso: value }),
  setAltura: (value) => set({ altura: value }),
  setTipoSangre: (value) => set({ tipoSangre: value }),

  // Alergias (ya existentes)
  addMedicationAllergy: (allergy) =>
    set((state) => ({
      medicationAllergies: [...state.medicationAllergies, allergy],
    })),
  removeMedicationAllergy: (allergy) =>
    set((state) => ({
      medicationAllergies: state.medicationAllergies.filter(
        (a) => a !== allergy
      ),
    })),

  addOtherAllergy: (allergy) =>
    set((state) => ({
      otherAllergies: [...state.otherAllergies, allergy],
    })),
  removeOtherAllergy: (allergy) =>
    set((state) => ({
      otherAllergies: state.otherAllergies.filter((a) => a !== allergy),
    })),

  // NUEVOS métodos para enfermedades crónicas
  addChronicDisease: (disease) =>
    set((state) => ({
      chronicDiseases: [...state.chronicDiseases, disease],
    })),

  removeChronicDisease: (index) =>
    set((state) => {
      const newArray = [...state.chronicDiseases];
      newArray.splice(index, 1);
      return { chronicDiseases: newArray };
    }),

  // Setter global para actualizar todo en un futuro GET
  setFichaMedicaData: (data) =>
    set({
      fechaNac: data.fechaNac ?? "",
      peso: data.peso ?? "",
      altura: data.altura ?? "",
      tipoSangre: data.tipoSangre ?? "",
      medicationAllergies: data.medicationAllergies ?? [],
      otherAllergies: data.otherAllergies ?? [],
      chronicDiseases: data.chronicDiseases ?? [],
    }),
}));
