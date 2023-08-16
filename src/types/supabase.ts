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
      customField: {
        Row: {
          createdAt: string
          id: number
          isRequired: boolean
          label: string | null
          name: string
          pattern: string | null
          placeholder: string | null
          promptText: string | null
          storeId: string
          type: string
        }
        Insert: {
          createdAt?: string
          id?: number
          isRequired?: boolean
          label?: string | null
          name?: string
          pattern?: string | null
          placeholder?: string | null
          promptText?: string | null
          storeId: string
          type?: string
        }
        Update: {
          createdAt?: string
          id?: number
          isRequired?: boolean
          label?: string | null
          name?: string
          pattern?: string | null
          placeholder?: string | null
          promptText?: string | null
          storeId?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "customField_storeId_fkey"
            columns: ["storeId"]
            referencedRelation: "store"
            referencedColumns: ["id"]
          }
        ]
      }
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
      generate_friendly_uuid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
