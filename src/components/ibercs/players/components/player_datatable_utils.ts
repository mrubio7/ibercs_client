import { computed, Ref } from 'vue';
import { PlayerModel } from '@/entities/players';

export interface PlayerWithRank extends PlayerModel {
	GlobalRank: number;
}

export const filterPlayers = (
	players: PlayerModel[],
	searchTerm: Ref<string>,
	sortBy: Ref<keyof PlayerModel['Stats'] | 'Nickname' | 'Elo'>,
	sortOrder: Ref<'asc' | 'desc'>
) => {
	return computed<PlayerWithRank[]>(() => {
		let sortedPlayers = [...players];
	
		// Ordenar por la columna seleccionada
		sortedPlayers.sort((a, b) => {
			let valA, valB;
			if (sortBy.value === 'Nickname') {
				valA = a.Nickname.toLowerCase();
				valB = b.Nickname.toLowerCase();
			} else if (sortBy.value === 'Elo') {
				valA = a.FaceitElo;
				valB = b.FaceitElo;
			} else {
				valA = a.Stats[sortBy.value] || 0;
				valB = b.Stats[sortBy.value] || 0;
			}
	
			if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
			if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
			return 0;
		});
	
		// Añadir el campo GlobalRank basado en la posición en sortedPlayers
		const rankedPlayers = sortedPlayers.map((player, index) => ({
			...player,
			GlobalRank: index + 1, // Índice de la lista global + 1
		}));
	
		// Aplicar el filtro de búsqueda después de asignar el GlobalRank
		if (searchTerm.value) {
			return rankedPlayers.filter((player) =>
			player.Nickname?.toLowerCase().includes(searchTerm.value.toLowerCase())
			);
		}
	
		return rankedPlayers;
	});
};

const levels = ['text-green-700' ,'text-green-600', 'text-green-500', 'text-green-300', 'text-yellow-500', 'text-yellow-500', 'text-red-400', 'text-red-500', 'text-red-600']


export function getColor(stat: number, p10: number, p95: number, isInverse: boolean = false) {
	if (isNaN(p10) || isNaN(p95)) {
		console.error('Error: p10 o p95 es NaN', { stat, p10, p95 });
		return 'text-gray-500';  // Color predeterminado en caso de error
	}

	const range = p95 - p10;
	const step = range / 8;

	// Si es inverso, intercambiamos el comportamiento de los colores
	if (isInverse) {
		if (stat <= p10) {
			return levels[0];
		} else if (stat >= p95) {
			return levels[8];
		} else {
			if (stat < p10 + step) {
				return levels[1];
			} else if (stat < p10 + step * 2) {
				return levels[2];
			} else if (stat < p10 + step * 3) {
				return levels[3];
			} else if (stat < p10 + step * 4) {
				return levels[4];
			} else if (stat < p10 + step * 5) {
				return levels[5];
			} else if (stat < p10 + step * 6) {
				return levels[6];
			} else if (stat < p10 + step * 7) {
				return levels[7];
			} else {
				return levels[8];
			}
		}
	} else {
		// Comportamiento normal
		if (stat <= p10) {
			return levels[8];
		} else if (stat >= p95) {
			return levels[1];
		} else {
			if (stat < p10 + step) {
				return levels[7];
			} else if (stat < p10 + step * 2) {
				return levels[6];
			} else if (stat < p10 + step * 3) {
				return levels[5];
			} else if (stat < p10 + step * 4) {
				return levels[4];
			} else if (stat < p10 + step * 5) {
				return levels[3];
			} else if (stat < p10 + step * 6) {
				return levels[2];
			} else if (stat < p10 + step * 7) {
				return levels[1];
			} else {
				return levels[0];
			}
		}
	}
}

export function calculatePercentiles(values: number[], percentile: number): number {
	if (values.length === 0) return NaN;  // Devuelve NaN si la lista está vacía
	values.sort((a, b) => a - b);  // Ordena los valores numéricos
	const index = (percentile / 100) * (values.length - 1);
	const lower = Math.floor(index);
	const upper = Math.ceil(index);
	const weight = index - lower;

	if (upper >= values.length) return values[lower]; // Si el índice está en el límite superior
	const res = values[lower] * (1 - weight) + values[upper] * weight;  // Interpolación
	return res
}