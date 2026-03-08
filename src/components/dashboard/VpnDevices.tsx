import { useState, useEffect } from "react";
import { Plus, Server, Laptop, Trash2, Download, QrCode, PowerOff } from "lucide-react";
import { vpnService } from "../../lib/vpnApi";
import type { Server as VpnServer, VpnDevice, DeviceCreateRequest, QrResponseData } from "../../types/vpn";
import { toast } from "sonner";

export const VpnDevices = ({ planLimit }: { planLimit: number }) => {
  const [devices, setDevices] = useState<VpnDevice[]>([]);
  const [servers, setServers] = useState<VpnServer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeQrData, setActiveQrData] = useState<QrResponseData | null>(null);
  const [isQrLoading, setIsQrLoading] = useState(false);
  
  // Create Device Form
  const [newDevice, setNewDevice] = useState<DeviceCreateRequest>({
    name: "",
    device_type: "laptop",
    os_type: "windows",
    description: ""
  });
  
  // Connection states
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [targetServerId, setTargetServerId] = useState("");
  const [activeDeviceId, setActiveDeviceId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [devicesRes, serversRes] = await Promise.all([
        vpnService.getDevices(),
        vpnService.getServers()
      ]);
      setDevices(devicesRes);
      setServers(serversRes);
    } catch (error) {
       console.error("Error loaded VPN data:", error);
       toast.error("No se pudo cargar la información de la VPN");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (devices.length >= planLimit) {
       toast.error("Has alcanzado el límite de dispositivos para tu plan actual");
       return;
    }
    
    try {
      await vpnService.createDevice(newDevice);
      toast.success("Dispositivo creado exitosamente");
      setShowCreateModal(false);
      setNewDevice({ name: "", device_type: "laptop", os_type: "windows", description: "" });
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Error al crear dispositivo");
    }
  };

  const handleDeleteDevice = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este dispositivo VPN? (Esto revocará su llave)")) return;
    try {
      await vpnService.deleteDevice(id);
      toast.success("Dispositivo eliminado");
      setDevices(devices.filter(d => d.id !== id));
    } catch (error) {
      toast.error("Error al eliminar el dispositivo");
    }
  };
  
  const handleDownloadConfig = async (device: VpnDevice) => {
    try {
      await vpnService.downloadDeviceConfig(device.id, device.name);
      toast.success("Archivo de configuración descargado");
    } catch (error) {
      toast.error("Error descargando la configuración .conf");
    }
  };
  
  const handleShowQr = async (deviceId: string) => {
    setIsQrLoading(true);
    setShowQrModal(true);
    try {
      const qrData = await vpnService.getDeviceQrCode(deviceId);
      setActiveQrData(qrData);
    } catch (error) {
      toast.error("No se pudo generar el código QR. ¿Está conectado al servidor?");
      setShowQrModal(false);
    } finally {
      setIsQrLoading(false);
    }
  };

  const executeConnection = async () => {
     if (!targetServerId || !activeDeviceId) return;
     try {
       await vpnService.connectDevice(activeDeviceId, targetServerId);
       toast.success("Dispositivo conectado al servidor VPN satisfactoriamente");
       setShowConnectModal(false);
       fetchData();
     } catch (error) {
       toast.error("No se pudo conectar el dispositivo");
     }
  };

  const handleDisconnect = async (deviceId: string) => {
     try {
       await vpnService.disconnectDevice(deviceId);
       toast.success("Dispositivo desconectado");
       fetchData();
     } catch (error) {
       toast.error("No se pudo desconectar el dispositivo");
     }
  };

  if (loading) {
     return <div className="animate-pulse h-64 bg-white/5 rounded-2xl flex items-center justify-center">Cargando módulos de red...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header and Counters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
           <h2 className="text-2xl font-display font-bold text-foreground">Mis Dispositivos VPN</h2>
           <p className="text-foreground/60 text-sm">Gestiona tus llaves WireGuard y conexiones activas.</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm">
               Uso: <span className="font-bold text-primary">{devices.length}</span> / {planLimit}
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              disabled={devices.length >= planLimit}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
            >
              <Plus className="w-4 h-4" />
              Nuevo Dispositivo
            </button>
         </div>
      </div>

      {/* Devices Grid */}
      {devices.length === 0 ? (
        <div className="glass p-12 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center">
           <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
             <Laptop className="w-8 h-8" />
           </div>
           <h3 className="text-xl font-bold text-foreground mb-2">Aún no hay dispositivos</h3>
           <p className="text-foreground/50 max-w-sm mb-6">Empieza creando un dispositivo para generar tus credenciales WireGuard y conectarte de forma segura.</p>
           <button onClick={() => setShowCreateModal(true)} className="px-6 py-3 bg-primary text-white rounded-xl font-bold">Crear Mi Primer Dispositivo</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
           {devices.map(device => (
              <div key={device.id} className={`glass p-6 rounded-3xl border ${device.connected_to ? 'border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'border-white/5'} flex flex-col justify-between h-full`}>
                 <div>
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                             <Laptop className="w-5 h-5 text-primary" />
                             {device.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-foreground/70 uppercase">
                                {device.device_type} • {device.os_type}
                             </span>
                             {device.connected_to ? (
                               <span className="text-xs px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 font-medium flex items-center gap-1">
                                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Conectado
                               </span>
                             ) : (
                               <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-foreground/50">Desconectado</span>
                             )}
                          </div>
                       </div>
                       <button onClick={() => handleDeleteDevice(device.id)} className="p-2 text-foreground/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                    
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 mb-6">
                       <p className="text-xs font-mono text-foreground/60 break-all"><span className="font-semibold text-foreground">PubKey:</span> {device.public_key.substring(0,25)}...</p>
                       <p className="text-xs font-mono text-foreground/60"><span className="font-semibold text-foreground">IP Privada:</span> {device.private_ip}</p>
                       {device.connected_to && (
                          <p className="text-xs text-green-400"><span className="font-semibold text-foreground">Nodo:</span> {servers.find(s => s.id === device.connected_to)?.name || 'Activo'}</p>
                       )}
                    </div>
                 </div>

                 {/* Acciones */}
                 <div className="grid grid-cols-2 gap-2 mt-auto">
                    {device.connected_to ? (
                       <button onClick={() => handleDisconnect(device.id)} className="col-span-2 py-2.5 rounded-xl border border-red-500/30 text-red-400 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-red-500/10 transition">
                         <PowerOff className="w-4 h-4" /> Finalizar Conexión
                       </button>
                    ) : (
                       <button onClick={() => { setActiveDeviceId(device.id); setShowConnectModal(true); }} className="col-span-2 py-2.5 rounded-xl border border-primary/30 text-primary flex items-center justify-center gap-2 text-sm font-semibold hover:bg-primary/10 transition">
                         <Server className="w-4 h-4" /> Conectar a VPN
                       </button>
                    )}
                    
                    <button onClick={() => handleDownloadConfig(device)} className="py-2.5 rounded-xl bg-white/5 text-foreground hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-semibold transition border border-transparent hover:border-white/10">
                      <Download className="w-4 h-4" /> Config File
                    </button>
                    <button 
                      onClick={() => handleShowQr(device.id)} 
                      disabled={!device.connected_to}
                      className="py-2.5 rounded-xl bg-white/5 text-foreground hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-semibold transition border border-transparent hover:border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                     >
                      <QrCode className="w-4 h-4" /> Ver QR
                    </button>
                 </div>
              </div>
           ))}
        </div>
      )}

      {/* --- MOODALS --- */}
      
      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="glass p-8 rounded-3xl border border-white/10 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
             <h3 className="text-2xl font-display font-bold text-foreground mb-6">Nuevo Dispositivo</h3>
             <form onSubmit={handleCreateDevice} className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-foreground mb-1">Nombre (p. ej. Mi Celular)</label>
                   <input required type="text" value={newDevice.name} onChange={e => setNewDevice({...newDevice, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-foreground mb-1">Dispositivo</label>
                     <select value={newDevice.device_type} onChange={e => setNewDevice({...newDevice, device_type: e.target.value as any})} className="w-full bg-[#121415] border border-white/10 rounded-xl px-4 py-2 text-foreground outline-none">
                        <option value="laptop">Laptop</option>
                        <option value="desktop">PC Mesa</option>
                        <option value="mobile">Móvil</option>
                        <option value="router">Router GL.iNet</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-foreground mb-1">OS</label>
                     <select value={newDevice.os_type} onChange={e => setNewDevice({...newDevice, os_type: e.target.value as any})} className="w-full bg-[#121415] border border-white/10 rounded-xl px-4 py-2 text-foreground outline-none">
                        <option value="windows">Windows</option>
                        <option value="macos">macOS</option>
                        <option value="linux">Linux</option>
                        <option value="android">Android</option>
                        <option value="ios">iOS / iPadOS</option>
                     </select>
                   </div>
                </div>
                <div className="flex gap-3 justify-end mt-8">
                   <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-xl text-foreground/70 hover:bg-white/5 transition">Cancelar</button>
                   <button type="submit" className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/20">Autorizar Llave</button>
                </div>
             </form>
           </div>
        </div>
      )}

      {/* Connect/Server Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="glass p-8 rounded-3xl border border-white/10 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
             <h3 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-2"><Server className="text-primary"/> Conectar al Nodo</h3>
             <p className="text-foreground/50 text-sm mb-6">Elige el servidor geográfico para tu túnel VPN.</p>
             
             <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {servers.map(server => (
                   <div key={server.id} 
                        onClick={() => setTargetServerId(server.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${targetServerId === server.id ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-white/5 flex flex-col justify-center items-center text-xs border border-white/10">
                              {server.location.substring(0,2).toUpperCase()}
                           </div>
                           <div>
                             <p className="font-bold text-foreground">{server.name}</p>
                             <p className="text-xs text-foreground/50">{server.location} • {server.ip_address}</p>
                           </div>
                         </div>
                         <div className="text-right">
                            <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 font-medium">Auto</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
             <div className="flex gap-3 justify-end mt-6">
                 <button onClick={() => setShowConnectModal(false)} className="px-4 py-2 rounded-xl text-foreground/70 hover:bg-white/5 transition">Cancelar</button>
                 <button onClick={executeConnection} disabled={!targetServerId} className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50">Establecer Túnel</button>
             </div>
           </div>
        </div>
      )}

      {/* QR Modal */}
      {showQrModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass p-8 rounded-3xl border border-white/10 w-full max-w-sm flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
               <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <QrCode className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-foreground mb-2">Escanea este Código</h3>
               <p className="text-foreground/50 text-sm mb-6">Usa la app oficial de WireGuard en tu móvil para importar el túnel al instante.</p>
               
               <div className="bg-white p-4 rounded-2xl w-full aspect-square flex items-center justify-center mb-6">
                  {isQrLoading ? (
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                  ) : activeQrData?.qr_url ? (
                    <img src={activeQrData.qr_url} alt="WireGuard QR Profile" className="w-full h-full object-contain" />
                  ) : activeQrData?.qr_code_base64 ? (
                    <img src={`data:${activeQrData.content_type};base64,${activeQrData.qr_code_base64}`} alt="WireGuard QR" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-400">QR no disponible</span>
                  )}
               </div>
               
               <button onClick={() => setShowQrModal(false)} className="w-full py-3 bg-white/10 text-foreground font-bold rounded-xl hover:bg-white/20 transition">Cerrar</button>
            </div>
         </div>
      )}

    </div>
  );
};
