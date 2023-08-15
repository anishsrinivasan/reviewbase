export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      store: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          createdAt: string
          description: string | null
          headerImage: string | null
          id: string
          logoImage: string | null
          name: string
          type: number
          updatedAt: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          createdAt?: string
          description?: string | null
          headerImage?: string | null
          id?: string
          logoImage?: string | null
          name: string
          type: number
          updatedAt?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          createdAt?: string
          description?: string | null
          headerImage?: string | null
          id?: string
          logoImage?: string | null
          name?: string
          type?: number
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_type_fkey"
            columns: ["type"]
            referencedRelation: "storeType"
            referencedColumns: ["id"]
          }
        ]
      }
      storePlatform: {
        Row: {
          platform: string
          storeId: string
          value: string
        }
        Insert: {
          platform: string
          storeId: string
          value: string
        }
        Update: {
          platform?: string
          storeId?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "storePlatform_storeId_fkey"
            columns: ["storeId"]
            referencedRelation: "store"
            referencedColumns: ["id"]
          }
        ]
      }
      storeType: {
        Row: {
          createdAt: string
          id: number
          name: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
