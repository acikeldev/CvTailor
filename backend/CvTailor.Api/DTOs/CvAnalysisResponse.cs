namespace CvTailor.Api.DTOs;

public class CvAnalysisResponse
{
    public CvAssessment OverallAssessment { get; set; } = new();
    public List<CvSuggestion> Suggestions { get; set; } = new();
}

public class CvAssessment
{
    public List<string> Strengths { get; set; } = new();
    public List<string> Weaknesses { get; set; } = new();
}

public class CvSuggestion
{
    public string Section { get; set; } = string.Empty;
    public string Recommendation { get; set; } = string.Empty;
} 