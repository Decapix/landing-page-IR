import { Admin } from "@/entities/admin.entity";
import { Landing } from "@/entities/landing.entity";
 

export interface AdminLoginRequestDTO {
    code: string;
    email: string;
}

export interface AdminLoginResponseDTO {
    success: boolean;
    status: number;
    message: string;
    data: {
        token: string;
        user: Admin;
    }
}

export interface AdminDashboardRequestDTO {
    token: string;
}

export interface AdminDashboardResponseDTO {
    success: boolean;
    status: number;
    message: string;
    data: {
        landings: Landing[];
    }
}