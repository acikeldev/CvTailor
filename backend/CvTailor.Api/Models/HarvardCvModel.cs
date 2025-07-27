using System.ComponentModel.DataAnnotations;

namespace CvTailor.Api.Models;

public class HarvardCvModel
{
    [Required]
    public PersonalInfo PersonalInfo { get; set; } = new();
    
    public List<Education> Education { get; set; } = new();
    
    public List<Experience> Experience { get; set; } = new();
    
    public Skills Skills { get; set; } = new();
    
    public List<Project> Projects { get; set; } = new();
    
    public List<Certification> Certifications { get; set; } = new();
    
    public List<Volunteer> Volunteer { get; set; } = new();
    
    public List<Publication> Publications { get; set; } = new();
}

public class CvEnhancementResponse
{
    public HarvardCvModel EnhancedCv { get; set; } = new();
    public List<CvChange> Changes { get; set; } = new();
}

public class CvChange
{
    public string Section { get; set; } = string.Empty;
    public string Field { get; set; } = string.Empty;
    public string OldValue { get; set; } = string.Empty;
    public string NewValue { get; set; } = string.Empty;
    public string ChangeType { get; set; } = string.Empty; // "improved", "added", "enhanced", "optimized"
    public string Description { get; set; } = string.Empty;
}

public class PersonalInfo
{
    [Required]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    public string? Phone { get; set; }
    
    public string? Address { get; set; }
    
    public string? LinkedIn { get; set; }
    
    public string? Website { get; set; }
}

public class Education
{
    [Required]
    public string Institution { get; set; } = string.Empty;
    
    [Required]
    public string Degree { get; set; } = string.Empty;
    
    public string? Field { get; set; }
    
    public string? GraduationDate { get; set; }
    
    public string? Gpa { get; set; }
    
    public List<string> RelevantCourses { get; set; } = new();
    
    public string? Honors { get; set; }
}

public class Experience
{
    [Required]
    public string Company { get; set; } = string.Empty;
    
    [Required]
    public string Position { get; set; } = string.Empty;
    
    public string? StartDate { get; set; }
    
    public string? EndDate { get; set; }
    
    public string? Location { get; set; }
    
    public string? Description { get; set; }
    
    public List<string> Achievements { get; set; } = new();
    
    public List<string> Technologies { get; set; } = new();
}

public class Skills
{
    public List<string> Technical { get; set; } = new();
    
    public List<string> Soft { get; set; } = new();
    
    public List<string> Languages { get; set; } = new();
}

public class Project
{
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public List<string> Technologies { get; set; } = new();
    
    public string? Url { get; set; }
    
    public string? GithubUrl { get; set; }
    
    public string? StartDate { get; set; }
    
    public string? EndDate { get; set; }
}

public class Certification
{
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string? Issuer { get; set; }
    
    public string? Date { get; set; }
    
    public string? ExpiryDate { get; set; }
    
    public string? Url { get; set; }
}

public class Volunteer
{
    [Required]
    public string Organization { get; set; } = string.Empty;
    
    public string? Role { get; set; }
    
    public string? StartDate { get; set; }
    
    public string? EndDate { get; set; }
    
    public string? Description { get; set; }
}

public class Publication
{
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string? Authors { get; set; }
    
    public string? Journal { get; set; }
    
    public string? Date { get; set; }
    
    public string? Url { get; set; }
} 