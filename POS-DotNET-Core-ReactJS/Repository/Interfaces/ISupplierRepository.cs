using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface ISupplierRepository
    {
        List<Supplier> GetSuppliers();

        List<Supplier> GetSuppliersASC();

        Supplier GetSupplierOnce(int id);

        List<Supplier> SearchSuppliers(string text);

        bool PostSuppliers(SupplierAddDTO obj);

        bool UpdateSuppliers(Supplier obj);
    }
}
