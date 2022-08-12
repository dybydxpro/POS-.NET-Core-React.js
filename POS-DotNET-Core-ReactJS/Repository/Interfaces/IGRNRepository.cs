﻿using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IGRNRepository
    {
        List<GRNAllDTO> GetGRNs();

        List<GRNGetOneDTO> GetGRNOnce(int id);

        List<GRNAllDTO> SearchGRNs(string text);

        GRNEditDTO GetOneByIDGRNs(int id);

        int GetMaxIDGRNs();

        bool PostGRNs(GRNAddDTO obj);

        bool EditGRNs(GRNEditDTO obj);
    }
}