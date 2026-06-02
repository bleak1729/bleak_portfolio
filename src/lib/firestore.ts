import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  summary: string
  url: string
  image: string   // base64 data URL or external URL
  tags: string[]
  result?: string
  active: boolean
  order: number
  createdAt?: Timestamp
}

export interface Service {
  id: string
  title: string
  summary: string
  url: string
  image: string   // base64 data URL or external URL
  tags: string[]
  active: boolean
  order: number
}

export interface Message {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Timestamp
}

export interface SiteSettings {
  email: string
  linkedin: string
}

// ─── Image compression (Canvas → base64 JPEG) ────────────────────────────────
// Max 900 × 600 px, quality 0.82 → typically 60–150 kB, well under Firestore 1 MB limit

export function compressImage(file: File, maxW = 900, maxH = 600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      const ratio = Math.min(maxW / width, maxH / height, 1)
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = reject
    img.src = url
  })
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project))
}

export async function addProject(data: Omit<Project, 'id'>): Promise<void> {
  await addDoc(collection(db, 'projects'), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export async function updateProject(id: string, data: Partial<Omit<Project, 'id'>>): Promise<void> {
  await updateDoc(doc(db, 'projects', id), data)
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, 'projects', id))
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const q = query(collection(db, 'services'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Service))
}

export async function addService(data: Omit<Service, 'id'>): Promise<void> {
  await addDoc(collection(db, 'services'), data)
}

export async function updateService(id: string, data: Partial<Omit<Service, 'id'>>): Promise<void> {
  await updateDoc(doc(db, 'services', id), data)
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, 'services', id))
}

// ─── Messages ────────────────────────────────────────────────────────────────

export async function getMessages(): Promise<Message[]> {
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Message))
}

export async function addMessage(data: Omit<Message, 'id' | 'read' | 'createdAt'>): Promise<void> {
  await addDoc(collection(db, 'messages'), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  })
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  await updateDoc(doc(db, 'messages', id), { read })
}

export async function deleteMessage(id: string): Promise<void> {
  await deleteDoc(doc(db, 'messages', id))
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> {
  const snap = await getDoc(doc(db, 'settings', 'general'))
  if (!snap.exists()) return { email: '', linkedin: '' }
  return snap.data() as SiteSettings
}

export async function saveSettings(data: SiteSettings): Promise<void> {
  await setDoc(doc(db, 'settings', 'general'), data)
}
