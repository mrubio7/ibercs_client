import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LEAGUES, PLAYER_ROLES } from './consts';
import { ApiBackend } from '@/api/api_backend';
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router';
import { ClearAuthState } from '@/states/auth_state';

const { toast } = useToast()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GetTournamentColor = (tournament: string): string => {
  const leagues = Object.values(LEAGUES); 

  for (const league of leagues) {
      if (league.NAME === tournament.toUpperCase()) {
          return league.COLOR;
      }
  }
  
  return "bg-gray-500"; 
};

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64Digest;
}

export const Logout = async () => {
  const res = await ApiBackend.Users.Logout()
  if (res.error === null) {
    ClearAuthState()
    toast({
      title: 'Sesion cerrada',
			description: 'Ha salido de su sesión.',
    })
    router.push("/")
  }
}

export function formatTimestampToDateTime(timestamp: number): string {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp * 1000); // Convertir a milisegundos

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const GetRoleIcon = (rol:string) => {
  switch (rol) {
      case PLAYER_ROLES.AWPer:
          return "ri:crosshair-line";
      case PLAYER_ROLES.EntryFragger:
          return "mdi:robot-angry";
      case PLAYER_ROLES.Flex:
          return "ph:puzzle-piece-fill";
      case PLAYER_ROLES.IGL:
          return "game-icons:pirate-captain";
      case PLAYER_ROLES.Lurker:
          return "mdi:rat";
      case PLAYER_ROLES.Rifler:
          return "game-icons:ak47";
      case PLAYER_ROLES.Support:
          return "game-icons:stun-grenade";
      case PLAYER_ROLES.Coach:
          return "mdi:whistle";
  }
}