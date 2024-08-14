// user-role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class UserRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Pastikan ada informasi pengguna dalam objek request
    if (!user) {
      return false; // Tolak akses jika pengguna tidak login
    }

    // Di sini Anda dapat mengakses properti pengguna seperti user.role_id
    // dan memeriksa peran pengguna untuk memberikan atau menolak akses

    // Misalnya, Anda dapat mengizinkan akses jika pengguna memiliki peran yang sesuai
    return user.role_id === 1; // Contoh: Hanya pengguna dengan role_id 1 yang diizinkan
  }
}
