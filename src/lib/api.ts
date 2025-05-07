// API client for the backend
import { getApiBaseUrl } from "./api-utils";

const API_URL = getApiBaseUrl();

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
}

// Authentication API functions
export interface PlanRegistrationData {
  user_id: number;
  name: string;
  email: string;
  contact: string;
  date: string;
  plan: string;
  price: string | number;
}

export const authApi = {
  signup: async (data: SignUpData): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Signup failed");
    }

    return response.json();
  },

  login: async (data: SignInData): Promise<{ message: string; user: User }> => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    return response.json();
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Logout failed");
    }

    return response.json();
  },
  getCurrentUser: async (): Promise<{ user: User }> => {
    const response = await fetch(`${API_URL}/current-user`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current user");
    }

    return response.json();
  },

  registerPlan: async (
    data: PlanRegistrationData
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Plan registration failed");
    }

    return response.json();  },
};

export interface AdminSignInData {
  username: string;
  password: string;
}

export interface DashboardStats {
  total_members: number;
  active_subscriptions: number;
  total_revenue: number;
  recent_registrations: any[];
}

export interface Member {
  id: number;
  full_name: string;
  email: string;
  plan: string;
  price: string | number;
  join_date: string;
  phone?: string;
}

export const adminApi = {
  login: async (data: AdminSignInData): Promise<{ message: string; admin_username: string }> => {
    const response = await fetch(`${API_URL}/admin/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Admin login failed');
    }
    
    return response.json();
  },
  
  logout: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Admin logout failed');
    }
    
    return response.json();
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch dashboard stats');
    }
    
    return response.json();
  },

  getAllMembers: async (): Promise<{ members: Member[] }> => {
    const response = await fetch(`${API_URL}/admin/members`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch members');
    }
    
    return response.json();
  },

  deleteMember: async (memberId: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/admin/members/${memberId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete member');
    }
    
    return response.json();
  },

  cancelSubscription: async (memberId: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/admin/members/${memberId}/subscription`, {
      method: 'DELETE',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to cancel subscription');
    }
    
    return response.json();
  },

  getMemberDetails: async (memberId: number): Promise<{ member: Member }> => {
    const response = await fetch(`${API_URL}/admin/members/${memberId}`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch member details');
    }
    
    return response.json();
  },
};
