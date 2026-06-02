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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from './firebase'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  summary: string
  url: string
  image: string
  imageRef?: string
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
  image: string
  imageRef?: string
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

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project))
}

export async function addProject(data: Omit<Project, 'id'>, imageFile?: File): Promise<void> {
  let image = data.image
  let imageRef = ''
  if (imageFile) {
    const result = await uploadImage(imageFile, 'projects')
    image = result.url
    imageRef = result.ref
  }
  await addDoc(collection(db, 'projects'), {
    ...data,
    image,
    imageRef,
    createdAt: serverTimestamp(),
  })
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id'>>,
  imageFile?: File
): Promise<void> {
  let updates: Partial<Omit<Project, 'id'>> = { ...data }
  if (imageFile) {
    const result = await uploadImage(imageFile, 'projects')
    updates.image = result.url
    updates.imageRef = result.ref
  }
  await updateDoc(doc(db, 'projects', id), updates)
}

export async function deleteProject(id: string, imageRef?: string): Promise<void> {
  if (imageRef) await deleteImage(imageRef)
  await deleteDoc(doc(db, 'projects', id))
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const q = query(collection(db, 'services'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Service))
}

export async function addService(data: Omit<Service, 'id'>, imageFile?: File): Promise<void> {
  let image = data.image
  let imageRef = ''
  if (imageFile) {
    const result = await uploadImage(imageFile, 'services')
    image = result.url
    imageRef = result.ref
  }
  await addDoc(collection(db, 'services'), { ...data, image, imageRef })
}

export async function updateService(
  id: string,
  data: Partial<Omit<Service, 'id'>>,
  imageFile?: File
): Promise<void> {
  let updates = { ...data }
  if (imageFile) {
    const result = await uploadImage(imageFile, 'services')
    updates = { ...updates, image: result.url, imageRef: result.ref }
  }
  await updateDoc(doc(db, 'services', id), updates)
}

export async function deleteService(id: string, imageRef?: string): Promise<void> {
  if (imageRef) await deleteImage(imageRef)
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

// ─── Storage helpers ─────────────────────────────────────────────────────────

async function uploadImage(
  file: File,
  folder: string
): Promise<{ url: string; ref: string }> {
  const path = `${folder}/${Date.now()}_${file.name}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return { url, ref: path }
}

async function deleteImage(refPath: string): Promise<void> {
  try {
    await deleteObject(ref(storage, refPath))
  } catch {
    // file may not exist, ignore
  }
}
