import { AdminRoutes } from "@/routes/route";
import { ApiCore } from "@/config/api-core";    
import { AdminDashboardResponseDTO, AdminLoginRequestDTO, AdminLoginResponseDTO } from "./dto/admin.dto";

export const AdminLogin = async (payload: AdminLoginRequestDTO): Promise<AdminLoginResponseDTO> => {
    const { code, email } = payload;
    return await ApiCore(AdminRoutes.login, {
        method: "POST",
        body: JSON.stringify({
            code: code,
            email: email,
        })
    });
}


export const AdminLandings = async (): Promise<AdminDashboardResponseDTO> => {
    return await ApiCore(AdminRoutes.dashboard, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}