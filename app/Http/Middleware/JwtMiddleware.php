<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try{
            JWTAuth::parseToken()->authenticate();
        }
        catch( TokenExpiredException $e ) {
            return response()->json([
                'error' => true,
                'message' => 'Token is expired'
            ], 401);
        } catch( TokenInvalidException $e ) {
            return response()->json([
                'error' => true,
                'message' => 'Token is invalid'
            ], 401);
        } catch( JWTException $e ) {
            return response()->json([
                'error' => true,
                'message' => 'Token not found'
            ], 401);
        } catch( Exception $e ) {
            return response()->json([
                'error' => true,
                'message' => 'Token not found'
            ], 401);
        }
        return $next($request);
    }
}
